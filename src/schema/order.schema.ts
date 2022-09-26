
import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  petid: [string]
  @Prop()
  shippingDate: Date
  @Prop({default: 'placed'})
  orderStatus: string

  
}

export const OrderSchema = SchemaFactory.createForClass(Order);