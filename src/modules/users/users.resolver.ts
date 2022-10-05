import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { LoansService } from '../loans/loans.service';
import { Loan } from '../loans/entities/loan.entity';
import { PubsubService } from '../pubsub/pubsub.service';
import { Book } from '../books/entities/book.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly loansService: LoansService,
    private readonly pubsubService: PubsubService,
  ) {}

  @Subscription(() => String, {
    resolve: (value) => value.requestBorrow,
  })
  requestBorrow() {
    return this.pubsubService.subscribeEvent('requestBorrow');
  }

  @Subscription(() => String, {
    resolve: (value) => value.responseBorrow,
  })
  responseBorrow() {
    return this.pubsubService.subscribeEvent('responseBorrow');
  }

  @Subscription(() => Book, {
    resolve: (value) => value.createNewBook,
  })
  createNewBook() {
    return this.pubsubService.subscribeEvent('createNewBook');
  }

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
