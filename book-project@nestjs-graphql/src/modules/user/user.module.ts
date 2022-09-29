import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './models';
import { UserRepository } from './user.repository';
import { OrderModule } from '../order/order.module';
import { OrderRepository } from '../order/order.repository';
import { BookRepository } from '../book/book.repository';
import { BookModule } from '../book/book.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : User.name  ,
        schema : UserSchema 
      }
    ]) ,
    OrderModule ,
    BookModule
  ] ,
  providers: [
     UserResolver,
     UserService , 
     UserRepository , 
     BookRepository , 
     OrderRepository ] ,
  exports : [  UserRepository , MongooseModule ]
})
export class UserModule {}
