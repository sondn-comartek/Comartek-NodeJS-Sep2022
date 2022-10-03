import { UseGuards } from '@nestjs/common'
import {
    Resolver,
    ResolveField,
    Mutation,
    Query,
    Args,
    Parent,
    Int,
} from '@nestjs/graphql'
import { Role } from '../auth/decorators'
import { JwtGuard, RoleGuard } from '../auth/guards'
import { CategoryService } from '../category/category.service'
import { Category } from '../category/models'
import { UserRole } from '../user/types'
import { BookService } from './book.service'
import { CreateBookInput } from './dto'
import { GetListArg } from './dto/get-list.arg'
import { Book } from './models'

@Resolver(() => Book)
export class BookResolver {
    constructor(
        private readonly bookService: BookService,
        private readonly categoryService: CategoryService,
    ) {}

    @Mutation(() => Book)
    @Role(UserRole.ADMIN)
    @UseGuards(JwtGuard, RoleGuard)
    createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
        return this.bookService.create(createBookInput)
    }

    @Query(() => [Book] )
    books(@Args() getListArg: GetListArg) {
      return this.bookService.findBooks(getListArg)
    }

    @ResolveField('categories', () => [Category])
    categories(@Parent() { categories }: Book) {
        return this.categoryService.findCategoriesByCodes(categories)
    }

    @ResolveField('total', () => Int )
    total(@Parent() { count_avaiable , count_unavaiable }: Book) {
        return this.bookService.calculateTotalCountBooks(count_avaiable , count_unavaiable)
    }

    
}
