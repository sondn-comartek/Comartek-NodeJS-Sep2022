import { NotificationModule } from './../notification/notification.module';
import { OrderLoader } from './../loader/order.loader';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderS, OrderSchema } from './entities/order.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookModule } from '../book/book.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderS.name, schema: OrderSchema }]),
    BookModule,
    NotificationModule,
    forwardRef(() => UserModule),
  ],
  providers: [
    OrderResolver,
    OrderService,
    OrderLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
