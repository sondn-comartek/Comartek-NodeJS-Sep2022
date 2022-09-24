import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from '../shared/inputs/update-user.input';
import { UserResponseType } from '../shared/types/user-response.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserResponseType])
  async findAllUser() {
    return await this.userService.getAllUser();
  }

  @Query(() => UserResponseType)
  async findUserByUserName(
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

  // @Query(() => User)
  // async findUserByDefaultId(@Args({ name: "id", type: () => String }) id: string) {
  //   return await this.userService.getUserByDefaultId(id);
  // }
}
