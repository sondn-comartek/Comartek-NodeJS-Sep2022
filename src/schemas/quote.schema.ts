import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocationInfo, Package,  } from '../interface/quote.interface';


export type QuoteDocument = Quote & Document;

@Schema()
export class Quote extends Document {
  @Prop({type: Object})
  "origin": LocationInfo

  @Prop({type: Object})
  "destination": LocationInfo

  @Prop({type: Object})
  "package": Package
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);