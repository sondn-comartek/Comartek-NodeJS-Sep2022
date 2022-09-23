import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Category } from '../shared/schemas';
import { CreateCategoryInput } from '../shared/inputs';
import { CategoryService } from './category.service';
import { CategoryResponseType } from '../shared/types/category-response.type';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryResponseType])
  async findAllCategory() {
    return await this.categoryService.findAllCategory();
  }

  // @Query(() => Category)
  // async findCategoryById(@Args({ name: 'id', type: () => String }) id: string) {
  //   return await this.categoryService.findCategoryById(id);
  // }

  @Mutation(() => CategoryResponseType)
  async createCategory(
    @Args({ name: 'createCategoryInput', type: () => CreateCategoryInput })
    createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @Mutation(() => CategoryResponseType)
  async deleteCategoryById(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    return await this.categoryService.deleteCategoryById(id);
  }

  @Mutation(() => CategoryResponseType)
  async updateCategoryById(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'updateCategoryInput', type: () => CreateCategoryInput })
    updateCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoryService.updateCategoryById(
      id,
      updateCategoryInput,
    );
  }

  // @Query(() => Category)
  // async findCategoryByName(
  //   @Args({ name: 'name', type: () => String }) name: string,
  // ) {
  //   return await this.categoryService.findCategoryByName(name);
  // }

  // @Mutation(() => String)
  // async updateCategoryByName(
  //   @Args({ name: 'name', type: () => String }) name: string,
  //   @Args({ name: 'updateCategoryInput', type: () => CreateCategoryInput })
  //   updateCategoryInput: CreateCategoryInput,
  // ) {
  //   return await this.categoryService.updateCategoryByName(
  //     name,
  //     updateCategoryInput,
  //   );
  // }
}
