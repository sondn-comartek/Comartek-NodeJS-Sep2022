import { UseGuards } from '@nestjs/common'
import {
   Resolver,
   ResolveField,
   Mutation,
   Query,
   Args,
   Parent,
} from '@nestjs/graphql'
import { Role } from '../auth/decorators'
import { JwtGuard, RoleGuard } from '../auth/guards'
import { BookService } from '../book/book.service'
import { Book } from '../book/models'
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

@Resolver(() => Order)
export class OrderResolver {
   constructor(
      private readonly orderService: OrderService,
      private readonly userService: UserService,
      private readonly bookService: BookService,
   ) {}
   @Mutation(() => Order)
   createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
      return this.orderService.create(createOrderInput)
   }

   @Mutation(() => OrderStatus)
   @Role(UserRole.ADMIN)
   @UseGuards(JwtGuard, RoleGuard)
   approveOrder(
      @Args('approveOrderInput') approveOrderInput: ApproveOrderInput,
   ) {
      return this.orderService.approve(approveOrderInput)
   }

   @ResolveField('customer', () => User)
   customer(@Parent() { customer }: Order) {
      return this.userService.findUser({ userid: customer })
   }

   @ResolveField('books', () => [Book])
   books(
    @Parent() { books }: Order , 
    @Loader(BookLoader) bookLoader: DataLoader<string , Book>
    ) {
      return bookLoader.loadMany(books)
   }
}
