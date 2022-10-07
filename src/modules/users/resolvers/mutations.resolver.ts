import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';
import { Role } from '../enums/role.enum';
import { UsersService } from '../services/users.service';

@Resolver(() => User)
export class UsersMutation {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async removeUser(@Args('id') id: string) {
    return await this.usersService.remove(id);
  }
}
