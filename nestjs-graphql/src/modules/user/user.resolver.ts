import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserDocument } from './model/user.model';
import { GetUserArg, UpdateUserInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard, StatusGuard } from '../auth/guards';
import { CurrentUser } from './decorators';
import { Status } from '../auth/decorators';
import { UserStatus } from './types'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query( () => [User] )
  @Status(UserStatus.ACTIVE)
  @UseGuards(JwtGuard , StatusGuard )
  user( @Args() getUserArg: GetUserArg ):Promise<UserDocument>{
    return this.userService.getUser(getUserArg);
  }

  @Mutation( () => User )
  @Status(UserStatus.ACTIVE)
  @UseGuards(JwtGuard , StatusGuard )
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput ,
    @CurrentUser() user: User
    ){
    return this.userService.updateUser(updateUserInput , user)
  }
  
  @Mutation( () => User )
  @Status(UserStatus.ACTIVE)
  @UseGuards( JwtGuard , StatusGuard)
  deleteUser(
    @Args('password') password :string ,
    @CurrentUser() user: User
  ):Promise<UserDocument>{
    return this.userService.deleteUser(password , user)
  }

}
