import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';

import { DeleteUserOutPut, UserOutput } from './entities/user.output';
import { DeleteUserInput } from './dto/user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Query(() => [UserOutput])
  async findAllUser() {
    return await this.userService.findAllUser();
  }

  @Roles(Role.Admin)
  @Mutation(() => DeleteUserOutPut)
  async deleteUser(@Args('deleteuser') deleteUserInput: DeleteUserInput) {
    try {
      await this.userService.deleteUser(deleteUserInput.id)
      return {
        status: 200,
        message: `deleted user ${deleteUserInput.id}`
      }
    } catch(err) {
      throw new Error("Server Err")
    }
  }
}
