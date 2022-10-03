import { BookSchema } from './../book/schemas/book.schema';
import { Rent, RentSchema } from 'src/modules/rent/schemas/rent.schema';
import { MongooseModule } from '@nestjs/mongoose';
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
import { Book } from '../book/schemas/book.schema';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RentModule),
    forwardRef(() => BookModule),
    forwardRef(() => CategoryModule),
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
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
  ],
})
export class LoaderModule {}
