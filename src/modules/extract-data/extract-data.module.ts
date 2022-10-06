import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExtractDataService } from './extract-data.service';
import { UserModule } from '../user/user.module';
import { RentModule } from '../rent/rent.module';
import { BookModule } from '../book/book.module';
import { CategoryModule } from '../category/category.module';
import { ExtractDataProcessor } from './processors/extract-data.processor';

@Module({
  imports: [
    UserModule,
    RentModule,
    BookModule,
    CategoryModule,
    BullModule.registerQueue({
      name: 'extract-data',
    }),
  ],
  providers: [ExtractDataService, ExtractDataProcessor],
})
export class ExtractDataModule {}
