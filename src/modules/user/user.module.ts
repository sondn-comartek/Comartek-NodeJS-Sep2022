import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/modules/schema/book.schema';
import { UserSchema } from 'src/modules/schema/user.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature(
    [
      {
      name: 'book', schema: BookSchema
      },
      {
        name: 'user', schema: UserSchema
      }
    ])
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
