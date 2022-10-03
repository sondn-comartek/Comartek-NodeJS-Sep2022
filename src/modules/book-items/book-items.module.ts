import { Module } from '@nestjs/common';
import { BookItemsService } from './book-items.service';
import { BookItemsResolver } from './book-items.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BookItem, BookItemSchema } from './entities/book-item.entity';
import { Book, BookSchema } from '../books/entities/book.entity';

@Module({
  providers: [BookItemsResolver, BookItemsService],
  imports: [
    MongooseModule.forFeature([
      { name: BookItem.name, schema: BookItemSchema },
    ]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  exports: [BookItemsService],
})
export class BookItemsModule {}
