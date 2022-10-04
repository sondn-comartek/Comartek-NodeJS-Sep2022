
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book extends Document {
  @Prop()
  name: string

  @Prop()
  categorys: [string]

  @Prop({default: null})
  episode?: number | null

  @Prop({default: []})
  images?: [string]

  @Prop({default: false})
  borrowed: boolean 
  
  @Prop({default: null})
  userborrow: string

}

export const BookSchema = SchemaFactory.createForClass(Book);