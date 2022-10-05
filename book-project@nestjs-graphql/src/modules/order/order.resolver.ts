import { UseGuards } from '@nestjs/common'
import {
   Resolver,
   ResolveField,
   Mutation,
   Query,
   Args,
   Parent,
   Subscription,
   ID,
} from '@nestjs/graphql'
import { Role } from '../auth/decorators'
import { JwtGuard, RoleGuard } from '../auth/guards'
import { BookService } from '../book/book.service'
import { Book, BookDocument } from '../book/models'
import { User } from '../user/models'
import { UserRole } from '../user/types'
import { UserService } from '../user/user.service'
import { ApproveOrderInput, CreateOrderInput } from './dto'
import { Order } from './models'
import { OrderService } from './order.service'
import { OrderStatus } from './types'
import { Loader } from 'nestjs-dataloader'
import { BookLoader } from '../dataloader/loaders'
import DataLoader from 'dataloader'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => Order)
export class OrderResolver {
   constructor(
      private readonly orderService: OrderService,
      private readonly userService: UserService,
      private readonly pubSub: PubSub,
   ) {}
   @Mutation(() => Order)
   @UseGuards(JwtGuard)
   async createOrder(
      @Args('createOrderInput') createOrderInput: CreateOrderInput,
   ) {
      const newOrder = await this.orderService.create(createOrderInput)
      this.pubSub.publish('newOrder', { newOrder: newOrder })
      return newOrder
   }

   @Subscription(() => Order)
   @Role(UserRole.ADMIN)
   @UseGuards(JwtGuard, RoleGuard)
   newOrder() {
      return this.pubSub.asyncIterator('newOrder')
   }

   @Mutation(() => Order)
   @Role(UserRole.ADMIN)
   @UseGuards(JwtGuard, RoleGuard)
   async approveOrder(
      @Args('approveOrderInput') approveOrderInput: ApproveOrderInput,
   ) {
      const orderApproved = await this.orderService.approve(approveOrderInput)
      this.pubSub.publish('orderApproved', { orderApproved: orderApproved })
      return orderApproved
   }

   @Subscription(() => Order, {
      filter: (payload, variables) => {
         return payload.orderApproved.customer === variables.userid
      },
   })
   @Role(UserRole.MEMBER, UserRole.SUBCRIBER)
   @UseGuards(JwtGuard, RoleGuard)
   orderApproved(@Args('userid', { type: () => ID }) userid: string) {
      return this.pubSub.asyncIterator('orderApproved')
   }

   @ResolveField('customer', () => User)
   customer(@Parent() { customer }: Order) {
      return this.userService.findUser({ userid: customer })
   }

   @ResolveField('books', () => [Book])
   books(
      @Parent() { books }: Order,
      @Loader(BookLoader) bookLoader: DataLoader<string, BookDocument>,
   ) {
      return bookLoader.loadMany(books)
   }
}
