import { BorrowStatus } from './../customer/borrow.enums';
import { CustomerService } from './../customer/customer.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  constructor(private customerService: CustomerService) {}
  updateBorrowStatus(borrowId: String, status: BorrowStatus) {
    return this.customerService.updateBorrowerStatus(borrowId, status);
  }
}
