import { BookService } from './../book.service';
import { Book } from './../schemas/book.schema';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';

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
    queryArgsInput: QueryArgsInput,
  ): Promise<Book[]> {
    return await this.bookService.findAll(queryArgsInput);
  }
}
