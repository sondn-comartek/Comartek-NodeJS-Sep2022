
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop()
  category: string;
  @Prop()
  name: string
  @Prop()
  tags: string[]
  @Prop()
  status: string
  @Prop({default: []})
  photoids: string[]

  @Prop({default: 100})
  price: number
  
}

export const PetSchema = SchemaFactory.createForClass(Pet);