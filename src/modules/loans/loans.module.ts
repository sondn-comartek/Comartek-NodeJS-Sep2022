import { forwardRef, Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansResolver } from './loans.resolver';
import { User, UserSchema } from '../users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookItem,
  BookItemSchema,
} from '../book-items/entities/book-item.entity';
import { Loan, LoanSchema } from './entities/loan.entity';
import { UsersModule } from '../users/users.module';
import { PubsubModule } from '../pubsub/pubsub.module';

@Module({
  providers: [LoansResolver, LoansService],
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    MongooseModule.forFeature([
      { name: BookItem.name, schema: BookItemSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UsersModule),
    LoansModule,
    PubsubModule,
  ],
  exports: [LoansService],
})
export class LoansModule {}
