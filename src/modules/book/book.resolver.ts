import { UseGuards } from '@nestjs/common'
import {
   Resolver,
   ResolveField,
   Mutation,
   Query,
   Args,
   Parent,
   Int,
   Subscription,
} from '@nestjs/graphql'
import { Role } from '../user/decorators'
import { JwtGuard, RoleGuard } from '../auth/guards'
import { CategoryService } from '../category/category.service'
import { Category, CategoryDocument } from '../category/models'
import { UserRole } from '../user/types'
import { BookService } from './book.service'
import { CreateBookInput } from './dto'
import { GetListArg } from './dto/get-list.arg'
import { Book } from './models'
import { Loader } from 'nestjs-dataloader'
import { CategoryLoader } from '../dataloader/loaders'
import DataLoader from 'dataloader'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => Book)
export class BookResolver {
   constructor(
      private readonly bookService: BookService,
      private readonly categoryService: CategoryService,
      private readonly pubSub: PubSub,
   ) {}

   @Mutation(() => Book)
   @Role(UserRole.ADMIN)
   @UseGuards(JwtGuard, RoleGuard)
   async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
      const newBook = await this.bookService.create(createBookInput)
      this.pubSub.publish('newBook', { newBook: newBook })
      return newBook
   }

   @Role(UserRole.SUBCRIBER)
   @UseGuards(JwtGuard, RoleGuard)
   @Subscription(() => Book)
   newBook() {
      return this.pubSub.asyncIterator('newBook')
   }

   @Query(() => [Book])
   @UseGuards(JwtGuard)
   books(@Args() getListArg: GetListArg) {
      return this.bookService.findBooks(getListArg)
   }

   @ResolveField('categories', () => [Category])
   categories(
      @Parent() { categories }: Book,
      @Loader(CategoryLoader)
      categoryLoader: DataLoader<string, CategoryDocument>,
   ) {
      return categoryLoader.loadMany(categories)
   }

   @ResolveField('total', () => Int)
   total(@Parent() { count_avaiable, count_unavaiable }: Book) {
      return this.bookService.calculateTotalCountBooks(
         count_avaiable,
         count_unavaiable,
      )
   }
}
