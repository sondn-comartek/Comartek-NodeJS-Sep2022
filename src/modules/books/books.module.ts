import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import {
  Category,
  CategorySchema,
} from '../categories/entities/category.entity';
import { BullModule } from '@nestjs/bull';
import { BookConsumer } from './books.processor';
import { LoansModule } from '../loans/loans.module';
import { UploadModule } from '../upload/upload.module';
import { BooksMutation } from './resolvers/mutations.resolver';
import { BooksQuery } from './resolvers/queries.resolver';
import { BooksController } from './controllers/books.controller';

@Module({
  providers: [BooksQuery, BooksMutation, BooksService, BookConsumer],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    BullModule.registerQueue({
      name: 'book',
    }),
    UploadModule,
    LoansModule,
  ],
  exports: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
