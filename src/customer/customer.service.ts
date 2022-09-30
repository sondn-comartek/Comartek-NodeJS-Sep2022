import { BorrowStatus } from './borrow.enums';
import { Borrower, BorrowerDocument } from './entities/borrower.entity';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { BookService } from './../book/book.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Borrower.name) private borrowModel: Model<BorrowerDocument>,
    private bookService: BookService,
  ) {}
  async createBorrow(createBorrowInput: CreateBorrowInput) {
    const createdBorrow = await this.borrowModel.create(createBorrowInput);
    return createdBorrow;
  }
  findByBorrowerIds(borrowerIds: string[]): any {
    return this.borrowModel.findById({ $in: borrowerIds });
  }
  updateBorrowerStatus(borrowerId: String, status: BorrowStatus) {
    return this.borrowModel.findByIdAndUpdate(borrowerId, {
      status: status,
    });
  }
}
