import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import mongoose from 'mongoose';
import { Pet } from './pet.schema';

@Schema({
  collection: 'orders',
  timestamps: true,
})
@ObjectType()
export class Order {
  @Prop({
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: Pet.name
  })
  petsId: string
}

export const OrderSchema = SchemaFactory.createForClass(Order);
