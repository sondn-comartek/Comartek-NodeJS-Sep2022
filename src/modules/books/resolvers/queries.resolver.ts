import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/modules/users/enums/role.enum';
import { BooksService } from '../services/books.service';
import { ListBook } from '../dto/list-book.output';
import { Book } from '../entities/book.entity';

@Resolver(() => Book)
export class BooksQuery {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book], { name: 'books' })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.booksService.findOne(id);
  }

  @Query(() => ListBook, { name: 'listBook' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async listBook() {
    return await this.booksService.listBook();
  }

  @ResolveField(() => ListBook, { name: 'listBooks' })
  async listBooks(@Parent() book: Book) {
    return await this.booksService.listBooks(book.id);
  }
}
