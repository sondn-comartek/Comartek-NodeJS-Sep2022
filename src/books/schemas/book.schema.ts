import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type BookDocument = Book & Document;

@Schema({
  timestamps: true,
})
export class Book {
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
  categoryId: string;

  @Prop({ required: true })
  part: number;

  @Prop({ required: true })
  numberOfPages: number;

  @Prop({ required: true })
  quantity: number;

  // @Prop({ required: true })
  // image: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
