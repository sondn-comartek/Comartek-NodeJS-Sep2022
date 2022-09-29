import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { IDataloaders } from 'src/dataloader/dataloader.interface';
import { LoansService } from 'src/loans/loans.service';
import { Loan } from 'src/loans/entities/loan.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly loansService: LoansService,
  ) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findByUsername(user.username);
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async findByUsername(@Args('username') username: string) {
    return await this.usersService.findByUsername(username);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  @ResolveField(() => Int, { name: 'totalBookBorrowed' })
  async totalBookBorrowed(@Parent() user: User) {
    const quantityBorrowed = await this.loansService.countLoanByUserId(user.id);
    return quantityBorrowed;
  }

  @ResolveField(() => [Loan], { name: 'borrowed' })
  async getBookBorrowed(
    @Parent() user: User,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return await loaders.loansLoader.load(user.id);
  }

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
