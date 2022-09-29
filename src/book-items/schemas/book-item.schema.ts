import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { StatusBookItem } from '../enums/status.enum';

export type BookItemDocument = BookItem & Document;

@Schema({
  timestamps: true,
})
export class BookItem {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true, type: String, default: StatusBookItem.Available })
  status: StatusBookItem;
}

export const BookItemSchema = SchemaFactory.createForClass(BookItem);
