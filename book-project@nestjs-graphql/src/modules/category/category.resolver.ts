import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Role } from '../auth/decorators';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { ListBook } from '../book/models';
import { UserRole } from '../user/types';
import { CategoryService } from './category.service';
import { CreateCategoryInput, GetListArg } from './dto';
import { Category } from './models';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) { }
  @Mutation(() => Category)
  @Role(UserRole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoryService.create(createCategoryInput)
  }

  @Query( () => ListBook)
  async getListBookOfCategory(
    @Args() getList: GetListArg
  ) {
    const books = await this.categoryService.findBooks(getList)
    return {
      books,
      count: books.length
    }
  }

}
