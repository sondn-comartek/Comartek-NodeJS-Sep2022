import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type BookDocument = Book & Document;

@ObjectType()
@Schema({
  timestamps: true,
})
export class Book {
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
}

export const BookSchema = SchemaFactory.createForClass(Book);
