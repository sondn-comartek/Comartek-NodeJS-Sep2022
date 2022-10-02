import { CreateCategoryInput } from './../inputs/create-category.input';
import { Category } from './../schemas/category.schema';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { UseGuards } from '@nestjs/common';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Resolver(() => Category)
export class CategoryMutationResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Admin() admin,
    @Args({ name: 'createCategoryInput', type: () => CreateCategoryInput })
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryInput);
  }
}
