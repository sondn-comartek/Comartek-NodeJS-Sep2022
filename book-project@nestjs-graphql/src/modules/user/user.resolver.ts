import { ExecutionContext, UseGuards } from '@nestjs/common'
import {
   Query,
   Mutation,
   Args,
   ResolveField,
   Parent,
   Int,
   Context,
} from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'
import { AuthService } from '../auth/auth.service'
import { Role } from '../auth/decorators'
import { JwtGuard, RoleGuard } from '../auth/guards'
import { Token } from '../auth/models'
import { Order } from '../order/models'
import { OrderService } from '../order/order.service'
import { OrderStatus } from '../order/types'
import { FilterUser } from './dto'
import { User } from './models'
import { UserRole } from './types'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
   constructor(
      private readonly userService: UserService,
      private readonly orderService: OrderService,
      private readonly authService: AuthService
   ) {}

   @Query(() => [User])
   @UseGuards(JwtGuard)
   users() {
      return this.userService.findUsers()
   }

   @Query(() => User)
   @UseGuards(JwtGuard)
   user(@Args() filter: FilterUser) {
      return this.userService.findUser(filter)
   }

   @ResolveField('orders', () => [Order])
   orders(@Parent() { userid }: User) {
      return this.orderService.findOrdersByCustomerId(userid)
   }

   @ResolveField('count', () => Int)
   count(
      @Parent() { userid }: User,
      @Args('orderStatus', { type: () => OrderStatus })
      status: OrderStatus,
   ) {
      return this.orderService.countBooksOfCustomerByStatus(userid, status)
   }

   @ResolveField('tokens', () => Token )
   tokens(
      @Parent() { userid }: User ,
   ) {
      return this.authService.findTokenByUserid(userid)
   }
}
