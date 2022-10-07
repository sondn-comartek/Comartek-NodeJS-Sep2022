import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import * as dayjs from 'dayjs';

export type BookDocument = Book & Document;

@ObjectType()
@Schema()
export class Book {
  @Field(() => String)
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  categoryId: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => Int)
  @Prop({ required: true })
  part: number;

  @Field(() => Int)
  @Prop({ required: true })
  numberOfPages: number;

  @Field(() => Int)
  @Prop({ required: true })
  quantity: number;

  @Field(() => String)
  @Prop({ required: true })
  imageId: string;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  createdAt: string;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  updatedAt: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
