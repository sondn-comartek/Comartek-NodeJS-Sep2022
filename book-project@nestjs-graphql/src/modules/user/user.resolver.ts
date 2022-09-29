
import { UseGuards } from '@nestjs/common';
import { Query , Mutation , Args } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql';
import { Role } from '../auth/decorators';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { OrderStatus } from '../order/types';
import {  ApproveOrderInput, FilterUser } from './dto';
import { User } from './models';
import { UserRole } from './types';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query( () => User )
  user(@Args() filter: FilterUser ){
    return this.userService.findOne(filter)
  }

  @Mutation( () => OrderStatus) 
  @Role( UserRole.ADMIN )
  @UseGuards( JwtGuard , RoleGuard)
  approveOrder( @Args('approveOrderInput') approveOrderInput: ApproveOrderInput ){
    return this.userService.approveOrder(approveOrderInput)
  }
}