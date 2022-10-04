import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../schema/book.schema';
import { BookService } from './book.service';
import { BookResolver } from './reslover/book.resolver';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'book', schema: BookSchema
        }
    ]),
  ],
  providers: [BookResolver, BookService]
})
export class BookModule {}
