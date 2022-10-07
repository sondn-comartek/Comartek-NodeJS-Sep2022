import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from '../loans/entities/loan.entity';
import { LoansModule } from '../loans/loans.module';
import { UsersQuery } from './resolvers/queries.resolver';
import { UsersMutation } from './resolvers/mutations.resolver';
import { UsersSubscription } from './resolvers/subscriptions.resolver';

@Module({
  providers: [UsersQuery, UsersMutation, UsersSubscription, UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    forwardRef(() => LoansModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
