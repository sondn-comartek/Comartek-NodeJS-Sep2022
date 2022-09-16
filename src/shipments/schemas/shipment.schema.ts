import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidateNested, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Data } from '../dto/basic-shipment.dto';

export type ShipmentDocument = Shipment & Document;

@Schema()
export class Shipment {
  @IsNotEmptyObject()
  @Type(() => Data)
  @ValidateNested()
  @Prop()
  data: Data;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
