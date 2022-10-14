import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { BooksService } from '../books.service';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookInput } from '../dto/update-book.input';
import { RolesGuard } from 'src/module/auth/guards/roles.guard';
import { Roles } from 'src/module/auth/decorators/roles.decorator';
import { Role } from 'src/module/auth/enums/role.enum';

@Resolver(() => Book)
export class BookMutationResolver {
    constructor(
        private readonly booksService: BooksService
    ) { }

    @Mutation(() => Book)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
        return this.booksService.create(createBookInput);
    }

    @Mutation(() => Book)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
        return this.booksService.update(updateBookInput.id, updateBookInput);
    }

    @Mutation(() => Book)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    removeBook(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.remove(id);
    }
}
