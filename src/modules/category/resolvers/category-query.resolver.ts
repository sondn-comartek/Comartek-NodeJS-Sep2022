import { CategoryService } from './../category.service';
import { Category } from './../schemas/category.schema';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { Book } from 'src/modules/book/schemas/book.schema';
import { Loader } from 'nestjs-dataloader';
import DataLoader from 'dataloader';
import { BookCategoryLoader } from 'src/modules/loader/loader.book';

@Resolver(() => Category)
export class CategoryQueryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query(() => [Category])
  async findAllCategory(
    @Args({
      name: 'queryArgsInput',
      type: () => QueryArgsInput,
      nullable: true,
      defaultValue: { limit: 0, skip: 0 },
    })
    queryArgsInput?: QueryArgsInput,
  ): Promise<Category[]> {
    return await this.categoryService.findAll(queryArgsInput);
  }

  @ResolveField(() => [Book])
  async books(
    @Parent() category: Category,
    @Loader(BookCategoryLoader)
    bookCategoryLoader: DataLoader<Category['_id'], [Book]>,
  ): Promise<[Book]> {
    return await bookCategoryLoader.load(category._id);
  }
}
