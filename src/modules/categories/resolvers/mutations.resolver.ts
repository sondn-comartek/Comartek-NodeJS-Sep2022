import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/modules/users/enums/role.enum';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';
import { Category } from '../entities/category.entity';

@Resolver(() => Category)
export class CategoriesMutation {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoriesService.create(createCategoryInput);
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return await this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async removeCategory(@Args('id', { type: () => String }) id: string) {
    return await this.categoriesService.remove(id);
  }
}
