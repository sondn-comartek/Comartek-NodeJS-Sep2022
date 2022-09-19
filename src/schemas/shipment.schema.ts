import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

import { LocationInfo, Package } from '../interface/quote.interface';

export type ShipmentDocument = Shipment & Document;



@Schema({timestamps: true})
export class Shipment extends Document {

  @Prop({default: 0})
  number: number

  @Prop()
  status: string

  @Prop(String)
  ref: String
  
  @Prop({type: Object})
  origin: LocationInfo

  @Prop({type: Object})
  destination: LocationInfo

  @Prop({type: Object})
  package: Package

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);