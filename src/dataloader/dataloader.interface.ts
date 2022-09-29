import * as DataLoader from 'dataloader';
import { BookItem } from 'src/book-items/entities/book-item.entity';
import { Book } from 'src/books/entities/book.entity';
import { Loan } from 'src/loans/entities/loan.entity';
import { User } from 'src/users/entities/user.entity';

export interface IDataloaders {
  usersLoader: DataLoader<string, User>;
  loansLoader: DataLoader<string, Loan>;
  bookItemsLoader: DataLoader<string, BookItem>;
  booksLoader: DataLoader<string, Book>;
}
