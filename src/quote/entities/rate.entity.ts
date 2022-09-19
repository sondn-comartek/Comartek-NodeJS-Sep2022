import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type RateDocument = Rate & Document
@Schema()
export class Rate{
    @Prop({type:Number})
    rate: number
    @Prop({type:Number})
    price: number
}
export const RateSchema = SchemaFactory.createForClass(Rate)