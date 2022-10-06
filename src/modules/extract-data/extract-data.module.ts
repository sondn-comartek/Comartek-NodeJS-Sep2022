import { ExcelModule } from './../excel/excel.module';
import { MediaModule } from './../media/media.module';
import { PubSubModule } from './../pubsub/pubsub.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExtractDataService } from './extract-data.service';
import { UserModule } from '../user/user.module';
import { RentModule } from '../rent/rent.module';
import { BookModule } from '../book/book.module';
import { CategoryModule } from '../category/category.module';
import { ExtractDataProcessor } from './processors/extract-data.processor';
import { ExtractDataMutationResolver } from './resolvers/extract-data-mutation.resolver';
import { ExtractDataSubscriptionResolver } from './resolvers/extract-data-subscription.resolver';

@Module({
  imports: [
    UserModule,
    RentModule,
    BookModule,
    CategoryModule,
    PubSubModule,
    MediaModule,
    ExcelModule,
    BullModule.registerQueue({
      name: 'extract-data',
    }),
  ],
  providers: [
    ExtractDataService,
    ExtractDataProcessor,
    ExtractDataMutationResolver,
    ExtractDataSubscriptionResolver,
  ],
})
export class ExtractDataModule {}
