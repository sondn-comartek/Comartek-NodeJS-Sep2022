import { Document } from "mongoose";
import { ObjectType, Field, ID, GraphQLTimestamp, Int } from "@nestjs/graphql";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { OrderStatus } from "../types";


export type OrderDocument = Order & Document

@ObjectType()
@Schema({
    timestamps: true
})
export class Order extends Document {
    @Field( () => ID)
    @Prop( { isRequired : true , unique : true })
    orderid : string 

    @Field(() => [ID])
    @Prop({ isRequired: true })
    pets: string[]

    @Field( () => GraphQLTimestamp)
    @Prop({ isRequired: true })
    expected_date: Date

    @Field(() => OrderStatus)
    @Prop({ 
        isRequired: true,
        default: OrderStatus.PLACED
    })
    status : OrderStatus

    @Field( () => Int) 
    @Prop({isRequired: true})
    total : number 
}


export const OrderSchema = SchemaFactory.createForClass(Order)
//     * A list of pets
//     * Expected shipping date
//     * Order status. There are 3 statuses available:
//     * placed: order is created
//     * approved: order is approved by the store & received payments
//     * delivered: order is successfully shipped to the buyer




