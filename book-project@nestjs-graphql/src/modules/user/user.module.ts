import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './models';
import { UserRepository } from './user.repository';
import { OrderModule } from '../order/order.module';
import { OrderRepository } from '../order/order.repository';
import { BookRepository } from '../book/book.repository';
import { BookModule } from '../book/book.module';
import { OrderService } from '../order/order.service';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : User.name  ,
        schema : UserSchema 
      }
    ]) ,
    forwardRef( () => OrderModule) ,
    forwardRef( () => BookModule )
  ] ,
  providers: [
     UserResolver,
     UserService , 
     UserRepository , 
     OrderService
    ] ,
  exports : [  UserRepository , MongooseModule , UserService ]
})
export class UserModule {}
