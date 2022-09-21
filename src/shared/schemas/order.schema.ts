import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'orders',
  _id: false,
  timestamps: true,
})
@ObjectType()
export class Order { }

export const OrderSchema = SchemaFactory.createForClass(Order);
