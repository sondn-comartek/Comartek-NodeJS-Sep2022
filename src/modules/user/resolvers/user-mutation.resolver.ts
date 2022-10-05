import { UserService } from 'src/modules/user/user.service';
import { Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../schemas/user.schema';
import { CurrentUser } from 'src/modules/auth/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UserMutationResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async applyReceiveNewBookInfo(@CurrentUser() user): Promise<User> {
    return await this.userService.applyReceiveNewBookInfo(user._id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async ignoreReceiveNewBookInfo(@CurrentUser() user): Promise<User> {
    return await this.userService.ignoreReceiveNewBookInfo(user._id);
  }
}
