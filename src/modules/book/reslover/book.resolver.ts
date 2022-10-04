import { Resolver, Query, Mutation, Args, Int, Subscription, GraphQLExecutionContext } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book, BorrowBookOutput } from '../entities/book.entity';
import { JWTAuthGuard } from 'src/modules/auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { User } from 'src/decorator/user.decorator';
import { UseGuards } from '@nestjs/common'
import { BorrowBookInput } from '../dto/user.input';

import { Inject } from '@nestjs/common';

import { PUB_SUB } from 'src/modules/pubSub/pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SignInOutput } from 'src/modules/auth/model/auth.output';
import { RolesGuard } from 'src/modules/auth/role.guard';
import { BorrowOrderBook } from '../entities/book-order.entity';
import { OrderAction } from '../dto/order-action.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService,
              @Inject(PUB_SUB) private pubSub: RedisPubSub) {}

  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @Mutation(() => BorrowBookOutput) 
  async borrowBook(@User() user, @Args('borrowbook') input: BorrowBookInput) {
    const order = await this.bookService.requireBorrowBook(user.id, input.bookid);
    const borrowOrderBook: BorrowOrderBook = {bookid: order.bookid, status: order.status, orderid: order.id, userid: order.userid}
    await this.pubSub.publish("borrowBook", {addBook: borrowOrderBook});
    return{
      status: 200,
      message: "require borrow book be send"
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Subscription(() => BorrowOrderBook, {
    async filter(payload, variables, context ){
      return context.req.user.role === Role.Admin
    }
  } )
  addBook() {
    return this.pubSub.asyncIterator('borrowBook')
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Mutation(() => BorrowBookOutput)
  async processOrder(@User() User, @Args('borrowbook') input: OrderAction ) {
    let order;
    if(input.action === 'accept') {
      order = await this.bookService.accepBorrowBook(input.orderid)
    }
    else if(input.action === 'reject') {
      order = await this.bookService.rejectBorrowBook(input.orderid)
    }
    const borrowOrderBook: BorrowOrderBook = {bookid: order.bookid, status: order.status, orderid: order.id, userid: order.userid}
    await this.pubSub.publish("orderStatus", {orderStatus: borrowOrderBook});
    return {
      status: 200,
      message: "action for borrow book order scuccess"
    }
  }

  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @Subscription(() => BorrowOrderBook, {
    async filter(payload, variables, context) {
      return context.req.user.id === payload.orderStatus.userid
    }
  })
  orderStatus() {
    return this.pubSub.asyncIterator('orderStatus')
  }


  @Roles(Role.Customer)
  @UseGuards(RolesGuard)
  @Subscription(() => [String], {
    async filter(payload, variables, context) {
      return context.req.user.role === Role.Customer
    }
  })
  newBook() {
    return this.pubSub.asyncIterator('newBook')
  }
}

