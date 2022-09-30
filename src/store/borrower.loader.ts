import { CustomerService } from './../customer/customer.service';
import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { Borrower } from 'src/customer/entities/borrower.entity';
@Injectable()
export class BorrowerLoader implements NestDataLoader<string, Borrower> {
  constructor(private readonly customerService: CustomerService) {}
  generateDataLoader(): DataLoader<string, Borrower> {
    return new DataLoader<string, Borrower>((keys?: string[]) =>
      this.customerService.findByBorrowerIds(keys),
    );
  }
}
