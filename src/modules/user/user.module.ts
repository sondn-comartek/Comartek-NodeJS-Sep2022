import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './models';
import { UserRepository } from './user.repository';
import { OrderModule } from '../order/order.module';
import { BookModule } from '../book/book.module';
import { OrderService } from '../order/order.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : User.name  ,
        schema : UserSchema 
      }
    ]) ,
    forwardRef( () => OrderModule) ,
    forwardRef( () => BookModule ), 
    forwardRef( () => AuthModule )
  ] ,
  providers: [
     UserResolver,
     UserService , 
     UserRepository , 
     OrderService ,
     AuthService ,
    ] ,
  exports : [  UserRepository , MongooseModule , UserService ]
})
export class UserModule {}
