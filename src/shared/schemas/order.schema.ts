import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    collection: "orders",
    _id: false,
    timestamps: true
})
export class Order { }

export const OrderSchema = SchemaFactory.createForClass(Order)
