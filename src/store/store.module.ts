import { BorrowerLoader } from './borrower.loader';
import { Module } from '@nestjs/common';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [CustomerModule],
  providers: [
    StoreResolver,
    StoreService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BorrowerLoader,
    },
  ],
})
export class StoreModule {}
