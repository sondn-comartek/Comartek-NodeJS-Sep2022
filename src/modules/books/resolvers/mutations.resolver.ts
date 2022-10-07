import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/modules/users/enums/role.enum';
import { BooksService } from '../services/books.service';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookInput } from '../dto/update-book.input';
import { Book } from '../entities/book.entity';

@Resolver(() => Book)
export class BooksMutation {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return await this.booksService.create(createBookInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async export() {
    return await this.booksService.exportBook();
  }

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return await this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async removeBook(@Args('id', { type: () => String }) id: string) {
    return await this.booksService.remove(id);
  }
}
