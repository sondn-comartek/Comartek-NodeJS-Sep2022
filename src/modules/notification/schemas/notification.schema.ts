import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { NotificationTypeEnum } from '../enums/notification-type.enum';

@ObjectType()
@Schema({
  collection: 'notifications',
  timestamps: true,
})
export class Notification {
  @Field(() => ID)
  readonly _id: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  readonly type: NotificationTypeEnum;

  @Field(() => String)
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  readonly entityId: string;

  // @Field(() => String)
  // @Prop({
  //   type: String,
  //   required: true,
  // })
  // readonly refCollectionName: string;

  @Field(() => String)
  readonly createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
