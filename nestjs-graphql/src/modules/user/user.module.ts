import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './model';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : User.name ,
        schema : UserSchema
      }
    ])
  ] ,
  providers: [UserResolver, UserService , UserRepository] ,
  exports : [UserRepository , MongooseModule ]
})
export class UserModule {}
