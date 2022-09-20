import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidateNested, IsNotEmptyObject } from 'class-validator';

import { Type } from 'class-transformer';

import { Data } from '../dto/basic-quote.dto';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote {
  @IsNotEmptyObject()
  @Type(() => Data)
  @ValidateNested()
  @Prop()
  data: Data;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
