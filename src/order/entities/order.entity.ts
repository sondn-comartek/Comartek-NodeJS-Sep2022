import { CreatePetInput } from './../../pet/dto/create-pet.input';
import { OrderStatus } from './../../enums/order.status';
import { Pet } from './../../pet/entities/pet.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;
@Schema({ timestamps: true })
@ObjectType()
export class Order {
  @Field(() => [Pet], { description: 'List Pets in order' })
  @Prop({ required: true })
  pets: Pet[];
  @Field(() => Date, { description: 'Expected shipping date' })
  @Prop()
  shipping_date: Date;
  @Field(() => OrderStatus, { description: 'order of status' })
  @Prop({ required: true })
  status: OrderStatus;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
