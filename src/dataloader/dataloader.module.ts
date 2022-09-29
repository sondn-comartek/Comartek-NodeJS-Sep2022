import { Module } from '@nestjs/common';
import { BookItemsModule } from 'src/book-items/book-items.module';
import { BooksModule } from 'src/books/books.module';
import { LoansModule } from 'src/loans/loans.module';
import { UsersModule } from 'src/users/users.module';
import { DataloaderService } from './dataloader.service';

@Module({
  providers: [DataloaderService],
  imports: [UsersModule, LoansModule, BookItemsModule, BooksModule],
  exports: [DataloaderService],
})
export class DataloaderModule {}
