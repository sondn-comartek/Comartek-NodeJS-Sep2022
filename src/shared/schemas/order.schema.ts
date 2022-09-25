import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from '../enums/order-status.enum';
import mongoose from 'mongoose';
import { Pet } from './pet.schema';
import { User } from './user.schema';

@Schema({
  collection: 'orders',
  timestamps: true,
})
@ObjectType()
export class Order {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
    default: OrderStatus.Processing,
  })
  status: OrderStatus;

  @Prop({
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: Pet.name,
  })
  petsId: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Date,
    required: true,
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 14); // after 2 week
      return currentDate;
    },
  })
  expectedShippingDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
