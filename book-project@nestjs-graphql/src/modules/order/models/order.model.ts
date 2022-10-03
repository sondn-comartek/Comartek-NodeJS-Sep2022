import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Book } from 'src/modules/book/models'
import { User } from 'src/modules/user/models'
import { OrderStatus } from '../types'

export type OrderDocument = Order & Document

@ObjectType()
@Schema({
   timestamps: true,
})
export class Order {
   @Field(() => ID)
   @Prop({
      unique: true,
      isRequired: true,
   })
   orderid: string

   @Field(() => User)
   @Prop({
      isRequired: true,
   })
   customer: string

   @Field(() => [Book])
   @Prop({
      isRequired: true,
   })
   books: string[]

   @Field(() => OrderStatus)
   @Prop({
      default: OrderStatus.PENDING,
   })
   status: OrderStatus

   @Field(() => Date)
   createdAt?: Date

   @Field(() => Date)
   updatedAt?: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
