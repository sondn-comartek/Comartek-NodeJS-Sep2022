import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookItemsService } from './book-items.service';
import { BookItem } from './entities/book-item.entity';
import { CreateBookItemInput } from './dto/create-book-item.input';
import { UpdateBookItemInput } from './dto/update-book-item.input';

@Resolver(() => BookItem)
export class BookItemsResolver {
  constructor(private readonly bookItemsService: BookItemsService) {}

  @Mutation(() => BookItem)
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

  @Mutation(() => BookItem)
  updateBookItem(
    @Args('updateBookItemInput') updateBookItemInput: UpdateBookItemInput,
  ) {
    return this.bookItemsService.update(
      updateBookItemInput.id,
      updateBookItemInput,
    );
  }

  @Mutation(() => BookItem)
  removeBookItem(@Args('id', { type: () => Int }) id: number) {
    return this.bookItemsService.remove(id);
  }
}
