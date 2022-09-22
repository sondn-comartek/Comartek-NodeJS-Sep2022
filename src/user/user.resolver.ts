import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../shared/schemas/user.schema';
import { UpdateUserInput } from '../shared/inputs/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Query(() => User)
  async getUserByUserName(
    @Args({ name: 'userName', type: () => String }) userName: string,
  ) {
    return await this.userService.getUserByUserName(userName);
  }

  @Mutation(() => String)
  async deleteUserById(@Args({ name: 'id', type: () => String }) id: string) {
    return await this.userService.deleteUserById(id);
  }

  @Mutation(() => String)
  async updateUserById(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'updateUserInput', type: () => UpdateUserInput })
    updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.updateUserById(id, updateUserInput);
  }
}
