import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { PetStatus } from '../enums/status.enum';

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop()
  category: string;

  @Prop()
  name: string;

  @Prop()
  tags: string;

  @Prop({ type: String, default: PetStatus.Available })
  status: string;

  @Prop()
  photoUrl: string;

  @Prop()
  price: number;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
