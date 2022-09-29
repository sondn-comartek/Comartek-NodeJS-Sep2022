import { forwardRef, Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansResolver } from './loans.resolver';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookItem,
  BookItemSchema,
} from 'src/book-items/schemas/book-item.schema';
import { Loan, LoanSchema } from './schemas/loan.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [LoansResolver, LoansService],
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    MongooseModule.forFeature([
      { name: BookItem.name, schema: BookItemSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UsersModule),
  ],
  exports: [LoansService],
})
export class LoansModule {}
