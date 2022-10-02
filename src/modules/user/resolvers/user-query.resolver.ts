import { Book } from 'src/modules/book/schemas/book.schema';
import { UseGuards } from '@nestjs/common';
import { UserService } from './../user.service';
import { User } from '../schemas/user.schema';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Int,
} from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';
import { Loader } from 'nestjs-dataloader';
import { Rent } from 'src/modules/rent/schemas/rent.schema';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import {
  BookRentalCountLoader,
  BookRentalInfoLoader,
  UserRentLoader,
} from 'src/modules/loader/loader.rent';
import DataLoader from 'dataloader';

@Resolver(() => User)
export class UserQueryResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async findAllUser(
    @Admin() admin,
    @Args({
      name: 'queryArgsInput',
      type: () => QueryArgsInput,
      nullable: true,
      defaultValue: { limit: 0, skip: 0 },
    })
    queryArgsInput: QueryArgsInput,
  ): Promise<User[]> {
    return await this.userService.findAll(queryArgsInput);
  }

  @ResolveField(() => [Rent])
  async rents(
    @Parent() user: User,
    @Loader(UserRentLoader) userRentLoader: DataLoader<User['_id'], Rent>,
  ): Promise<Rent> {
    return await userRentLoader.load(user._id);
  }

  @ResolveField(() => Int, { nullable: true })
  async bookRentalCount(
    @Parent() user: User,
    @Loader(BookRentalCountLoader)
    bookRentalCountLoader: DataLoader<User['_id'], number>,
  ): Promise<number> {
    return;
  }

  @ResolveField(() => [Book], { nullable: true })
  async bookRentalInfo(
    @Parent() user: User,
    @Loader(BookRentalInfoLoader)
    bookRentalInfoLoader: DataLoader<User['_id'], Book>,
  ): Promise<Book> {
    return;
  }
}
