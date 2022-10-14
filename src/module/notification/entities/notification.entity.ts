import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type NotificationDocument = Notification & Document;

@Schema({
  collection: 'notifications'
})
@ObjectType()
export class Notification {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @Prop({
    required: true
  })
  type: string;

  @Field(() => String)
  @Prop({
    required: true
  })
  notificationMsg: string;

  @Field(() => String)
  data: string;

  @Field(() => String)
  @Prop({
    required: true
  })
  createdAt: string
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);