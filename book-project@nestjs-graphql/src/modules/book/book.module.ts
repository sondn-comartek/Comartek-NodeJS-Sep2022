import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { MongooseModule } from '@nestjs/mongoose'
import { Book, BookSchema } from './models';
import { BookRepository } from './book.repository';
import { CategoryModule } from '../category/category.module';
import { CategoryRepository } from '../category/category.repository';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : Book.name ,
        schema : BookSchema
      }
    ]) ,
    forwardRef( () => CategoryModule )
  ] ,
  providers: [
    BookResolver,
    BookService , 
    BookRepository , 
    CategoryRepository
  ] ,
  exports : [ BookRepository  , MongooseModule ]
})
export class BookModule {}
