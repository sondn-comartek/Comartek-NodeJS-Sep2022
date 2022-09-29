import { Module } from '@nestjs/common';
import { BookItemsService } from './book-items.service';
import { BookItemsResolver } from './book-items.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BookItem, BookItemSchema } from './schemas/book-item.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';

@Module({
  providers: [BookItemsResolver, BookItemsService],
  imports: [
    MongooseModule.forFeature([
      { name: BookItem.name, schema: BookItemSchema },
    ]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
})
export class BookItemsModule {}
