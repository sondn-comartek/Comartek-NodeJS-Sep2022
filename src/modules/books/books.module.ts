import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import {
  Category,
  CategorySchema,
} from '../categories/entities/category.entity';
import { BullModule } from '@nestjs/bull';
import { HelpersService } from '../../helpers/helpers.service';
import { BookConsumer } from './books.processor';
import { LoansModule } from '../loans/loans.module';
import { UploadModule } from '../upload/upload.module';

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
    UploadModule,
    LoansModule,
  ],
  exports: [BooksService],
})
export class BooksModule {}
