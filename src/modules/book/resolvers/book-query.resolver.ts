import { Category } from './../../category/schemas/category.schema';
import { Media } from './../../media/schemas/media.schema';
import { BookService } from './../book.service';
import { Book } from './../schemas/book.schema';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { Loader } from 'nestjs-dataloader';
import { MediaLoader } from 'src/modules/loader/loader.media';
import * as DataLoader from 'dataloader';
import { CategoryLoader } from 'src/modules/loader/loader.category';

@Resolver(() => Book)
export class BookQueryResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async findAllBook(
    @Args({
      name: 'queryArgsInput',
      type: () => QueryArgsInput,
      nullable: true,
      defaultValue: { limit: 0, skip: 0 },
    })
    queryArgsInput?: QueryArgsInput,
  ): Promise<Book[]> {
    return await this.bookService.findAll(queryArgsInput);
  }

  @ResolveField(() => Media)
  async thumbnail(
    @Parent() book: Book,
    @Loader(MediaLoader)
    mediaCategoryLoader: DataLoader<Book['mediaId'], Media>,
  ): Promise<Media> {
    return await mediaCategoryLoader.load(book.mediaId);
  }

  @ResolveField(() => Category)
  async categoryInfo(
    @Parent() book: Book,
    @Loader(CategoryLoader)
    categoryLoader: DataLoader<Book['categoryId'], Category>,
  ): Promise<Category> {
    return categoryLoader.load(book.categoryId);
  }
}
