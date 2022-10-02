import { CreateBookInput } from './../inputs/create-book.input';
import { Book } from './../schemas/book.schema';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Admin } from 'src/modules/auth/decorators/admin.decorator';

@Resolver(() => Book)
export class BookMutationResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  @UseGuards(JwtAuthGuard)
  async createBook(
    @Admin() admin,
    @Args({ name: 'createBookInput', type: () => CreateBookInput })
    createBookInput: CreateBookInput,
  ): Promise<Book> {
    return await this.bookService.create(createBookInput)
  }
}
