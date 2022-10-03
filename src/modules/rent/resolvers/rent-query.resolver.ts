import { User } from './../../user/schemas/user.schema';
import { Rent } from './../schemas/rent.schema';
import { Args, Query, ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { RentService } from '../rent.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { UseGuards } from '@nestjs/common';
import { Book } from 'src/modules/book/schemas/book.schema';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { BookLoader } from 'src/modules/loader/loader.book';
import { UserLoader } from 'src/modules/loader/loader.user';

@Resolver(() => Rent)
export class RentQueryResolver {
  constructor(private readonly rentService: RentService) {}

  @Query(() => [Rent])
  @UseGuards(JwtAuthGuard)
  async findAllRent(
    @Admin() admin,
    @Args({
      name: 'queryArgsInput',
      type: () => QueryArgsInput,
      nullable: true,
      defaultValue: { limit: 0, skip: 0 },
    })
    queryArgsInput?: QueryArgsInput,
  ): Promise<Rent[]> {
    return await this.rentService.findAll(queryArgsInput);
  }

  @ResolveField(() => User)
  async userInfo(
    @Parent() rent: Rent,
    @Loader(UserLoader) userLoader: DataLoader<Rent['userId'], User>,
  ): Promise<User> {
    return userLoader.load(rent.userId);
  }

  @ResolveField(() => [Book])
  async booksInfo(
    @Parent() rent: Rent,
    @Loader(BookLoader) bookLoader: DataLoader<Rent['bookIds'], [Book]>,
  ): Promise<[Book]> {
    return await bookLoader.load(rent.bookIds);
  }
}
