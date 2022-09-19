import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocationInfo, Package,  } from '../interface/quote.interface';


export type DiscountDocument = Discount & Document;

@Schema()
export class Discount extends Document {
  @Prop()
  "percent": number
}

export const DisCountSchema = SchemaFactory.createForClass(Discount);