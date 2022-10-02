import { CategoryService } from './../category.service';
import { Category } from './../schemas/category.schema';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';

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
    queryArgsInput: QueryArgsInput,
  ): Promise<Category[]> {
    return await this.categoryService.findAll(queryArgsInput);
  }
}
