import { Module } from '@nestjs/common';
import { BookItemsModule } from '../book-items/book-items.module';
import { BooksModule } from '../books/books.module';
import { LoansModule } from '../loans/loans.module';
import { UsersModule } from '../users/users.module';
import { DataloaderService } from './dataloader.service';

@Module({
  providers: [DataloaderService],
  imports: [UsersModule, LoansModule, BookItemsModule, BooksModule],
  exports: [DataloaderService],
})
export class DataloaderModule {}
