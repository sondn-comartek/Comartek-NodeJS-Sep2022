import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { RentBookInput } from '../dto/rent-book.input';
import { CurrentUser } from '../../auth/decorators/users.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RentBook } from '../../rent/entities/rent.entity';
import { RentService } from '../../rent/rent.service';
import { RentLoader } from '../../loader/loader.rent';
import { RolesGuard } from 'src/module/auth/guards/roles.guard';
import { Roles } from 'src/module/auth/decorators/roles.decorator';
import { Role } from 'src/module/auth/enums/role.enum';

@Resolver(() => User)
export class UserMutationResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly rentService: RentService
  ) { }

  @Mutation(() => RentBook)
  @UseGuards(JwtAuthGuard)
  async rentBook(
    @CurrentUser() user: User,
    @Args('rentBookInput') rentBookInput: RentBookInput
  ) {
    return this.rentService.processRentBook(user._id, rentBookInput);
  }

  @Mutation(() => RentBook)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async approvedRentBook(@Args('id') id: string) {
    return this.rentService.approvedRentBook(id);
  }

  @Mutation(() => RentBook)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async rejectedRentBook(@Args('id') id: string) {
    return this.rentService.rejectedRentBook(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
