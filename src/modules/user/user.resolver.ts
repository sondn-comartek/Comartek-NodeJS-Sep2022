import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { OrderS } from '../order/entities/order.entity';
import { OrderLoader } from '../loader/order.loader';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import * as _ from 'lodash';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }
  @ResolveField(() => OrderS)
  async getAmountBooksBorrowedUser(
    @Parent() user: User,
    @Loader(OrderLoader) orderLoader: DataLoader<User['_id'], OrderS>,
  ) {
    const dataLoader = await orderLoader.load(user._id);
    console.log(dataLoader);
    return dataLoader;
  }
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne('email');
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
