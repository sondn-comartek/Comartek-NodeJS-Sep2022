import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from 'src/book/book.module';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { Borrower, BorrowerSchema } from './entities/borrower.entity';

@Module({
  imports: [
    BookModule,
    MongooseModule.forFeature([
      { name: Borrower.name, schema: BorrowerSchema },
    ]),
  ],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
