import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../shared/schemas/user.schema';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
