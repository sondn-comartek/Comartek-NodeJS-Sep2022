import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  @Prop()
  weight: number;

  @Prop()
  price: GLfloat;
}

export const RateSchema = SchemaFactory.createForClass(Rate);
