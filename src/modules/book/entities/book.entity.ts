import { BookStatus } from './../enums/status.enum';
import { Category } from './../../category/entities/category.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;
@Schema({ timestamps: true })
@ObjectType()
export class Book {
  @Field(() => String, { description: 'Book id' })
  @Prop()
  bookID: string;
  @Field(() => String, { description: 'book name' })
  @Prop()
  book_title: string;
  @Field(() => String, { description: 'category of book' })
  @Prop()
  category: string;
  @Field(() => Number, { description: 'volume' })
  @Prop()
  volume: number;
  @Field(() => Number, { description: 'page number' })
  @Prop()
  page: number;
  @Field(() => String, { description: 'photo of book' })
  @Prop()
  photo_id: string;
  @Field(() => BookStatus, { description: 'status of book' })
  @Prop({ required: true, default: BookStatus.available })
  status: BookStatus;
}
export const BookSchema = SchemaFactory.createForClass(Book);
