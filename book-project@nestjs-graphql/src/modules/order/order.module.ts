import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from './models';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderRepository } from './order.repository';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { UserRepository } from '../user/user.repository';
import { BookRepository } from '../book/book.repository';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : Order.name  ,
        schema : OrderSchema 
      }
    ]) ,
    BookModule ,
    forwardRef( () => UserModule)
  ] ,
  providers: [
     OrderResolver,
     OrderService , 
     BookRepository ,
     OrderRepository , 
     UserRepository
    ] ,
  exports : [ OrderRepository , MongooseModule ]
})
export class OrderModule {}
