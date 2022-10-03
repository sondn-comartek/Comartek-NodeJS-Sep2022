import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/schema/book.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature(
    [{
      name: 'book', schema: BookSchema
    }])],
  providers: [UserResolver, UserService]
})
export class UserModule {}
