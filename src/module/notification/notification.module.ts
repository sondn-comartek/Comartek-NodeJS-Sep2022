import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { BooksModule } from '../books/books.module';
import { PubsubModule } from '../pubsub/pubsub.module';
import { RentModule } from '../rent/rent.module';
import { NotificationSchema } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationSubscriptionsResolver } from './resolvers/subscriptions.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Notification', schema: NotificationSchema}]),
    forwardRef(() => PubsubModule),
    forwardRef(() => AuthModule),
    forwardRef(() => RentModule),
    forwardRef(() => BooksModule)
  ],
  providers: [NotificationSubscriptionsResolver, NotificationService],
  exports: [NotificationSubscriptionsResolver, NotificationService]
})
export class NotificationModule {}
