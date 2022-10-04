import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { NotificationTypes } from '../enums/notification.enum';

@InputType()
export class CreateNotificationDto {
  @Field(() => String, { description: 'content of notification' })
  @Prop({ required: true })
  content: string;
  @Field(() => String, { description: 'owner of notification' })
  @Prop({ required: true })
  ownerID: string;
  @Field(() => NotificationTypes, { description: 'notification type' })
  @Prop({ required: true })
  type: NotificationTypes;
}
