import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BooksModule } from '../books/books.module';
import { CategoriesModule } from '../categories/categories.module';
import { NotificationModule } from '../notification/notification.module';
import { PubsubModule } from '../pubsub/pubsub.module';
import { ProcessDataProcessor } from './export.processor';
import { ExportService } from './export.service';
import { ExportQueryResolver } from './resolvers/queries.resolver';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'processData',
    }),
    forwardRef(() => BooksModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => PubsubModule),
    forwardRef(() => NotificationModule)
  ],
  providers: [ExportQueryResolver, ExportService, ProcessDataProcessor],
  exports: [ExportQueryResolver, ExportService]
})
export class ExportModule {}
