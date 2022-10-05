import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { BookItemsService } from './book-items.service';
import { BookItem } from './entities/book-item.entity';
import { CreateBookItemInput } from './dto/create-book-item.input';
import { UpdateBookItemInput } from './dto/update-book-item.input';
import { Book } from '../books/entities/book.entity';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Resolver(() => BookItem)
export class BookItemsResolver {
  constructor(private readonly bookItemsService: BookItemsService) {}

  @Mutation(() => BookItem)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async createBookItem(
    @Args('createBookItemInput') createBookItemInput: CreateBookItemInput,
  ) {
    return await this.bookItemsService.create(createBookItemInput);
  }

  @Query(() => [BookItem], { name: 'bookItems' })
  findAll() {
    return this.bookItemsService.findAll();
  }

  @Query(() => BookItem, { name: 'bookItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookItemsService.findOne(id);
  }

  @ResolveField(() => Book, { name: 'book' })
  async getBook(
    @Parent() bookItem: BookItem,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    return await loaders.booksLoader.load(bookItem.bookId);
  }

  @Mutation(() => BookItem)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  updateBookItem(
    @Args('updateBookItemInput') updateBookItemInput: UpdateBookItemInput,
  ) {
    return this.bookItemsService.update(
      updateBookItemInput.id,
      updateBookItemInput,
    );
  }

  @Mutation(() => BookItem)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  removeBookItem(@Args('id', { type: () => Int }) id: number) {
    return this.bookItemsService.remove(id);
  }
}
