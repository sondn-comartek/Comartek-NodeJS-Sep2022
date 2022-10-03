import { OrderLoader } from './order.loader';
import { CategoryModule } from '../category/category.module';
import { forwardRef, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { BookModule } from '../book/book.module';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => BookModule),
    forwardRef(() => OrderModule),
    forwardRef(() => CategoryModule),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    OrderLoader
  ],
})
export class LoaderModule {}
