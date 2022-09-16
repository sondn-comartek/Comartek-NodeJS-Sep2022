import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type ShipmentDocument = Shipment & Document
@Schema({timestamps:true})
export class Shipment {
    @Prop({type:String})
    quote_id: string
    @Prop({type:String})
    ref: string
    @Prop({type:Number})
    cost: number
}
export const ShipmentSchema = SchemaFactory.createForClass(Shipment)