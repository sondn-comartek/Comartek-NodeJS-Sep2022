import { Module } from '@nestjs/common';
import { BookItemsService } from './services/book-items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookItem, BookItemSchema } from './entities/book-item.entity';
import { Book, BookSchema } from '../books/entities/book.entity';
import { BookItemsQuery } from './resolvers/queries.resolver';
import { BookItemsMutation } from './resolvers/mutations.resolver';

@Module({
  providers: [BookItemsQuery, BookItemsMutation, BookItemsService],
  imports: [
    MongooseModule.forFeature([
      { name: BookItem.name, schema: BookItemSchema },
    ]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  exports: [BookItemsService],
})
export class BookItemsModule {}
