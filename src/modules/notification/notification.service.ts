import { CreateNotificationDto } from './dto/create-notification.input';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDocument } from './entities/notification.entity';
import { v4 as uuidV4 } from 'uuid';
import { Notification } from './entities/notification.entity';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();
@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}
  async listen(triggerName: string) {
    return await pubSub.asyncIterator(triggerName);
  }
  async register(triggerName, payload) {
    return await pubSub.publish(triggerName, payload);
  }
  async create(triggerName, createNotificationDto: CreateNotificationDto) {
    const payload = { notificationID: uuidV4(), ...createNotificationDto };
    const notificationCreated = await this.notificationModel.create(payload);
    await this.register(triggerName, notificationCreated);
    return notificationCreated;
  }
}
