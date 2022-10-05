import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { ListBook } from './dto/list-book.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return await this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
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

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }
}
