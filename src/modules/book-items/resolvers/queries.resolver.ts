import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { Book } from 'src/modules/books/entities/book.entity';
import { IDataloaders } from 'src/modules/dataloader/dataloader.interface';
import { BookItemsService } from '../services/book-items.service';
import { BookItem } from '../entities/book-item.entity';

@Resolver(() => BookItem)
export class BookItemsQuery {
  constructor(private readonly bookItemsService: BookItemsService) {}

  @Query(() => [BookItem], { name: 'bookItems' })
  async findAll() {
    return await this.bookItemsService.findAll();
  }

  @Query(() => BookItem, { name: 'bookItem' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.bookItemsService.findOne(id);
  }

  @ResolveField(() => Book, { name: 'book' })
  async getBook(
    @Parent() bookItem: BookItem,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return await loaders.booksLoader.load(bookItem.bookId);
  }
}
