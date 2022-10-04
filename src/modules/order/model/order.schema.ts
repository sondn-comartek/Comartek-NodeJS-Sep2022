
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order extends Document {
  @Prop()
  bookid: string

  @Prop()
  userid: string

  @Prop({default: "processing"})
  status: string
}

export const OrderSchema = SchemaFactory.createForClass(Order);