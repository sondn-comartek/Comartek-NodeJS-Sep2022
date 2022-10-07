import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { ListBook } from 'src/modules/books/dto/list-book.output';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../entities/category.entity';

@Resolver(() => Category)
export class CategoriesQuery {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ResolveField(() => ListBook, { name: 'listCategory' })
  async listCategory(@Parent() category: Category) {
    return await this.categoriesService.listCategory(category.id);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.categoriesService.findOne(id);
  }
}
