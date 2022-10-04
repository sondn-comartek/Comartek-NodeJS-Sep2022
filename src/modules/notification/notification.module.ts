import { MongooseModule } from '@nestjs/mongoose';
import { Module, Global } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
