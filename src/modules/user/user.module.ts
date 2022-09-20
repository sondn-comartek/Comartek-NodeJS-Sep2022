import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name : 'User' ,
        schema : UserSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService , UserRepository] ,
  exports: [UserService , MongooseModule , UserRepository] 
})
export class UserModule { }
