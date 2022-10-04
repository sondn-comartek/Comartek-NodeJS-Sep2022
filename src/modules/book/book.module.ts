import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/role.guard';
import { OrderModule } from '../order/order.module';
import { BookSchema } from '../schema/book.schema';
import { BookService } from './book.service';
import { BookResolver } from './reslover/book.resolver';

@Module({
  imports: [
    AuthModule,
    OrderModule,
    MongooseModule.forFeature(
      [
        {
          name: 'book', schema: BookSchema
        }
    ]),
  ],
  providers: [BookResolver, BookService , RolesGuard, JwtService]
})
export class BookModule {}
