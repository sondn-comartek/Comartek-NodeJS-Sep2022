import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import {
  Category,
  CategorySchema,
} from 'src/categories/schemas/category.schema';
import { BullModule } from '@nestjs/bull';
import { HelpersService } from 'src/helpers/helpers.service';
import { BookConsumer } from './books.processor';
import { LoansModule } from 'src/loans/loans.module';

@Module({
  providers: [BooksResolver, BooksService, HelpersService, BookConsumer],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    BullModule.registerQueue({
      name: 'book',
    }),
    LoansModule,
  ],
  exports: [BooksService],
})
export class BooksModule {}
