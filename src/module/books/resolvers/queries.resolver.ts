import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { BooksService } from '../books.service';
import { BookList } from '../dto/list-book.response';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';

@Resolver(() => Book)
export class BookQueryResolver {
    constructor(
        private readonly booksService: BooksService
    ) { }

    @Query(() => BookList)
    @UseGuards(JwtAuthGuard)
    getAllBook(
        @Args('offset') offset: number,
        @Args('limit') limit: number
    ) {
        return this.booksService.findAllBook(offset, limit);
    }
}
