import { BookQueryResolver } from './resolvers/book-query.resolver';
import { Book, BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { CategoryModule } from '../category/category.module';
import { MediaModule } from '../media/media.module';
import { BookMutationResolver } from './resolvers/book-mutation.resolver';

@Module({
  imports: [
    CategoryModule,
    MediaModule,
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [BookService, BookMutationResolver, BookQueryResolver],
  exports: [BookService]
})
export class BookModule {}
