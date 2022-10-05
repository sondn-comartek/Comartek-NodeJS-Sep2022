import { BookSchema } from './../book/schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaModule } from './../media/media.module';
import { BookCategoryLoader, BookLoader } from './loader.book';
import { CategoryModule } from './../category/category.module';
import { UserModule } from './../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import {
  RentLoader,
  UserRentLoader,
  BookRentalCountLoader,
  BookRentalInfoLoader,
} from './loader.rent';
import { RentModule } from '../rent/rent.module';
import { BookModule } from '../book/book.module';
import { MediaLoader } from './loader.media';
import { CategoryLoader } from './loader.category';
import { UserLoader } from './loader.user';
import { Book } from '../book/schemas/book.schema';
import { Rent, RentSchema } from '../rent/schemas/rent.schema';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RentModule),
    forwardRef(() => BookModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => MediaModule),
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Rent.name,
        schema: RentSchema,
      },
    ]),
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    RentLoader,
    UserRentLoader,
    BookLoader,
    BookCategoryLoader,
    BookRentalCountLoader,
    BookRentalInfoLoader,
    MediaLoader,
    CategoryLoader,
    UserLoader,
  ],
})
export class LoaderModule {}
