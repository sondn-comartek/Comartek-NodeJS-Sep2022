import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { StatusBookItem } from '../enums/status.enum';
import { ObjectType, Field } from '@nestjs/graphql';
import * as dayjs from 'dayjs';

export type BookItemDocument = BookItem & Document;

@ObjectType()
@Schema()
export class BookItem {
  @Field()
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  bookId: string;

  @Field(() => String)
  @Prop({ required: true, type: String, default: StatusBookItem.Available })
  status: StatusBookItem;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  createdAt: string;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  updatedAt: string;
}

export const BookItemSchema = SchemaFactory.createForClass(BookItem);
