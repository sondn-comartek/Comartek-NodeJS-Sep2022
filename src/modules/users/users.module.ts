import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from '../loans/entities/loan.entity';
import { LoansModule } from '../loans/loans.module';

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
