import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { NotificationTypes } from '../enums/notification.enum';

@InputType()
export class CreateNotificationDto {
  @Field(() => String, { description: 'content of notification' })
  content: string;
  @Field(() => String, { description: 'owner of notification' })
  ownerID: string;
  @Field(() => NotificationTypes, { description: 'notification type' })
  type: NotificationTypes;
  @Field(() => [String], { description: 'recipients notification' })
  recipients: string[];
}
