import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidateNested, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Data } from '../dto/basic-shipment.dto';

export type ShipmentDocument = Shipment & Document;

enum Status {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Delivery = 'delivery',
  Completed = 'completed',
  Failed = 'failed',
}
@Schema()
export class Shipment {
  @IsNotEmptyObject()
  @Type(() => Data)
  @ValidateNested()
  @Prop()
  data: Data;

  @Prop({ type: String, default: Status.Pending })
  status: Status;

  @Prop()
  shipmentId: number;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
