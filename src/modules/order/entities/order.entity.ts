import { OrderStatus } from './../enums/order.enum';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import * as dayjs from 'dayjs';
export type OrderSDocument = OrderS & Document;
@Schema({ timestamps: true })
@ObjectType()
export class OrderS {
  @Field(() => String, { description: 'user id' })
  @Prop({ required: true })
  userID: string;
  @Field(() => String, { description: 'book id' })
  @Prop({ required: true })
  bookID: string;
  @Field(() => Date, { description: 'borrowed date' })
  @Prop({ required: true, default: dayjs(new Date()).unix() })
  borrowed_date: Date;
  @Field(() => Date, { description: 'return data' })
  @Prop({ required: true })
  return_data: Date;
  @Field(() => OrderStatus, { description: 'return data' })
  @Prop({ required: true, default: OrderStatus.pending })
  status: OrderStatus;
}
export const OrderSchema = SchemaFactory.createForClass(OrderS);
