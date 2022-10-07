import { UseGuards } from '@nestjs/common'
import {
   Resolver,
   Mutation,
   Query,
   Args,
   ResolveField,
   Parent,
   Int,
} from '@nestjs/graphql'
import { Role } from '../user/decorators'
import { JwtGuard, RoleGuard } from '../auth/guards'
import { BookService } from '../book/book.service'
import { Book } from '../book/models'
import { UserRole } from '../user/types'
import { CategoryService } from './category.service'
import { CreateCategoryInput, GetCategoryArg } from './dto'
import { Category } from './models'

@Resolver(() => Category)
export class CategoryResolver {
   constructor(
      private readonly categoryService: CategoryService,
      private readonly bookService: BookService,
   ) {}
   @Mutation(() => Category)
   @Role(UserRole.ADMIN)
   @UseGuards(JwtGuard, RoleGuard)
   createCategory(
      @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
   ) {
      return this.categoryService.create(createCategoryInput)
   }

   @Query(() => Category)
   async category(@Args() getCategoryArg: GetCategoryArg) {
      return this.categoryService.findOneCategory(getCategoryArg)
   }

   @Query(() => [Category])
   async categories() {
      return this.categoryService.findAllCategories()
   }

   @ResolveField(() => [Book])
   books(
      @Parent() { code }: Category,
      @Args('page', { nullable: true }) page: number | null,
   ) {
      return this.bookService.findBooksByCategoryCode(code, page)
   }
}
