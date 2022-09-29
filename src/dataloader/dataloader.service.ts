import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { IDataloaders } from './dataloader.interface';
import * as DataLoader from 'dataloader';
import { Loan } from 'src/loans/entities/loan.entity';
import { LoansService } from 'src/loans/loans.service';
import { BookItemsService } from 'src/book-items/book-items.service';
import { BookItem } from 'src/book-items/entities/book-item.entity';
import { Book } from 'src/books/entities/book.entity';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly usersService: UsersService,
    private readonly loansService: LoansService,
    private readonly bookItemsService: BookItemsService,
    private readonly booksService: BooksService,
  ) {}

  createLoaders(): IDataloaders {
    const usersLoader = new DataLoader<string, User>(
      async (keys: readonly string[]) =>
        await this.usersService.getUsersByBatch(keys as string[]),
    );

    const loansLoader = new DataLoader<string, Loan>(
      async (keys: readonly string[]) =>
        await this.loansService.getLoansByBatch(keys as string[]),
    );

    const bookItemsLoader = new DataLoader<string, BookItem>(
      async (keys: readonly string[]) =>
        await this.bookItemsService.getBookItemsByBatch(keys as string[]),
    );

    const booksLoader = new DataLoader<string, Book>(
      async (keys: readonly string[]) =>
        await this.booksService.getBooksByBatch(keys as string[]),
    );

    return {
      usersLoader,
      loansLoader,
      bookItemsLoader,
      booksLoader,
    };
  }
}
