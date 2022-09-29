import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from 'src/loans/schemas/loan.schema';
import { LoansModule } from 'src/loans/loans.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    forwardRef(() => LoansModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
