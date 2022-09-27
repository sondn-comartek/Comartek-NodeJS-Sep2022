import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
