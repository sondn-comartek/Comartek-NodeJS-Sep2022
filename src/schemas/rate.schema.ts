import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  @Prop(Number)
  weight: Number;

  @Prop(Number)
  price: Number;
}

export const RateSchema = SchemaFactory.createForClass(Rate);