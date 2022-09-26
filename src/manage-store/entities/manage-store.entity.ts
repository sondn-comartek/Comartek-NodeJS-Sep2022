import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ManagePet } from 'src/manage-pet/entities/manage-pet.entity';

export type ManageOrderDocument = ManageOrder & Document

@Schema({
  timestamps: true,
  collection: 'orders'
})  

@ObjectType()
export class ManageOrder {
  @Field(() => String, { name: 'orderId', description: 'ID of the order', nullable: false })
  @Prop({
    required: true  
  })
  orderId: string;

  @Field(() => [ManagePet], { name: 'petList', description: 'List of pet in order', nullable: false })
  @Prop({
    required: true  
  })
  petList: [ManagePet];

  @Field({ name: 'expectedShippingDate', description: 'The expected date that customer want to receive the shipping', nullable: false })
  @Prop({
    required: true  
  })
  expectedShippingDate: Date;

  @Field({ name: 'orderStatus', description: 'Status of the order', nullable: false })
  @Prop({
    required: true  
  })
  orderStatus: string;

  @Field({ name: 'totalCost', description: 'Total cost of an order', nullable: false })
  @Prop({
    required: true  
  })
  totalCost: number;
}

export const OrderSchema = SchemaFactory.createForClass(ManageOrder)