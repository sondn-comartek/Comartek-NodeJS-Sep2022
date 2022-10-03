
import { forwardRef, Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { BooksModule } from 'src/module/books/books.module';
import { UsersModule } from "src/module/users/users.module";
import { RentModule } from '../rent/rent.module';
// import { UserLoader } from "./loader.user";
import { BookLoader } from './loader.book';
import { CategoryBookLoader } from './loader.category-book';
import { RentLoader } from './loader.rent';
// import { UserLoader } from './loader.user';

@Global()
@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => BooksModule),
    forwardRef(() => RentModule)
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    BookLoader,
    RentLoader,
    CategoryBookLoader
  ]
})
export class LoaderModule {}