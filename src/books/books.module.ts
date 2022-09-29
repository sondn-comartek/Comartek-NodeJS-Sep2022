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
  ],
  exports: [BooksService],
})
export class BooksModule {}
