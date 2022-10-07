import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Role } from 'src/modules/users/enums/role.enum';
import { BookItemsService } from '../services/book-items.service';
import { CreateBookItemInput } from '../dto/create-book-item.input';
import { UpdateBookItemInput } from '../dto/update-book-item.input';
import { BookItem } from '../entities/book-item.entity';

@Resolver(() => BookItem)
export class BookItemsMutation {
  constructor(private readonly bookItemsService: BookItemsService) {}

  @Mutation(() => BookItem)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async createBookItem(
    @Args('createBookItemInput') createBookItemInput: CreateBookItemInput,
  ) {
    return await this.bookItemsService.create(createBookItemInput);
  }

  @Mutation(() => BookItem)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateBookItem(
    @Args('updateBookItemInput') updateBookItemInput: UpdateBookItemInput,
  ) {
    return await this.bookItemsService.update(
      updateBookItemInput.id,
      updateBookItemInput,
    );
  }

  @Mutation(() => BookItem)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async removeBookItem(@Args('id', { type: () => String }) id: string) {
    return await this.bookItemsService.remove(id);
  }
}
