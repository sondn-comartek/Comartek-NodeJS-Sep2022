import { NotificationTypes } from './../enums/notification.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;
@Schema({ timestamps: true })
@ObjectType()
export class Notification {
  @Field(() => String, { description: 'ID notification' })
  @Prop({ required: true, unique: true })
  notificationID: string;
  @Field(() => String, { description: 'content of notification' })
  @Prop({ required: true })
  content: string;
  @Field(() => String, { description: 'owner of notification' })
  @Prop({ required: true })
  ownerID: string;
  @Field(() => NotificationTypes, { description: 'notification type' })
  @Prop({ required: true })
  type: NotificationTypes;
  @Field(() => [String], { description: 'recipients notification' })
  @Prop({ required: true })
  recipients: string[];
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
