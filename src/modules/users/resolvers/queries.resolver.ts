import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IDataloaders } from 'src/modules/dataloader/dataloader.interface';
import { Loan } from 'src/modules/loans/entities/loan.entity';
import { LoansService } from '../../loans/services/loans.service';
import { User } from '../entities/user.entity';
import { Role } from '../enums/role.enum';
import { UsersService } from '../services/users.service';

@Resolver(() => User)
export class UsersQuery {
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
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.findUserById(id);
  }

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
}
