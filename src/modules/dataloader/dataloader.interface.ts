import * as DataLoader from 'dataloader';
import { BookItem } from '../book-items/entities/book-item.entity';
import { Book } from '../books/entities/book.entity';
import { Loan } from '../loans/entities/loan.entity';
import { User } from '../users/entities/user.entity';

export interface IDataloaders {
  usersLoader: DataLoader<string, User>;
  loansLoader: DataLoader<string, Loan>;
  bookItemsLoader: DataLoader<string, BookItem>;
  booksLoader: DataLoader<string, Book>;
}
