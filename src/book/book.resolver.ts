import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current.user';
import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @CurrentUser() user: User,
  ) {
    return await this.bookService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'book' })
  findAll() {
    return this.bookService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  async updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @CurrentUser() user: User,
  ) {
    return await this.bookService.update(updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.remove(id);
  }
}
