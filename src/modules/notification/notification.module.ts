import { NotificationSubscriptionResolver } from './resolvers/notification-subscription.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  providers: [NotificationService, NotificationSubscriptionResolver],
  exports: [NotificationService],
})
export class NotificationModule {}
