import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { RentService } from '../rent.service';
import { RentBook } from '../entities/rent.entity';
import { Book } from 'src/module/books/entities/book.entity';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { BookLoader } from '../../loader/loader.book';

@Resolver(() => RentBook)
export class RentQueryResolver {
  constructor(private readonly rentService: RentService) {}

  @Query(() => [RentBook])
  getAllRent() {
    return this.rentService.findAllRent();
  }

  @Query(() => RentBook, { name: 'rent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rentService.findOne(id);
  }

  @ResolveField(() => [Book], { name: 'book' })
  async getBookOfRent(
    @Parent() rentBook: RentBook,
    @Loader(BookLoader) bookLoader: DataLoader<RentBook['book'], Book>
  ): Promise<Book | Error> {
    return await bookLoader.load(rentBook.book);
  }
}
