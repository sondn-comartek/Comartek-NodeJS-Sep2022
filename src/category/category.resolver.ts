import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateCategoryInput } from '../shared/inputs';
import { CategoryService } from './category.service';
import { CategoryResponseType } from '../shared/types/category-response.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { Admin } from 'src/authentication/decorators/admin.decorator';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryResponseType])
  async findAllCategory() {
    return await this.categoryService.findAllCategory();
  }

  @Mutation(() => CategoryResponseType)
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Admin() admin: any,
    @Args({ name: 'createCategoryInput', type: () => CreateCategoryInput })
    createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @Mutation(() => String)
  @UseGuards()
  async deleteCategoryById(
    @Admin() admin: any,
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<string> {
    return await this.categoryService.deleteCategoryById(id);
  }

  @Mutation(() => String)
  async updateCategoryById(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'updateCategoryInput', type: () => CreateCategoryInput })
    updateCategoryInput: CreateCategoryInput,
  ): Promise<string> {
    return await this.categoryService.updateCategoryById(
      id,
      updateCategoryInput,
    );
  }
}
