import { NotificationSchema } from './entities/notification.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
