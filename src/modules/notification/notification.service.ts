import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationSchema: Model<Notification>,
  ) {}

  async create({ type, entityId }): Promise<Notification> {
    return await this.notificationSchema.create({ type, entityId });
  }
}
