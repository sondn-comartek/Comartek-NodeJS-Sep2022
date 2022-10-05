import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification') private readonly notification: Model<Notification>
  ) { }

  async create(type: string, notificationMsg: string) {
    const newNotification = {
      type: type,
      notificationMsg: notificationMsg,
      createdAt: dayjs().format()
    }

    const createdNotification = await this.notification.create(newNotification);
    if (!createdNotification) {
      throw new HttpException('Error in creating a new notification', HttpStatus.BAD_REQUEST);
    }
    return createdNotification;
  }
}
