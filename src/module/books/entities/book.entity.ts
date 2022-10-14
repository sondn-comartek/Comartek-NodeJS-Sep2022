import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Category } from 'src/module/categories/entities/category.entity';

export type BookDocument = Book & Document;

@Schema({
  collection: 'books'
})
@ObjectType()
export class Book {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { name: 'bookName', nullable: false })
  @Prop({
    required: true
  })
  bookName: string;

  @Field(() => String, { name: 'categoryId', nullable: false })
  @Prop({
    required: true
  })
  categoryId: string

  @Field(() => Int, { name: 'chapter', nullable: false })
  @Prop({
    required: true
  })
  chapter: number;

  @Field(() => Int, { name: 'totalPage', nullable: false })
  @Prop({
    required: true
  })
  totalPage: number;

  @Field(() => [String], { name: 'imageUrl', nullable: false })
  @Prop({
    required: true
  })
  imageUrl: string[];

  @Field(() => Int, { name: 'totalBook', description: "The number of book in the book's store", nullable: false })
  @Prop({
    required: true
  })
  totalBook: number;

  @Field(() => Int, { name: 'availableBook', description: "The number of available book in the book's store", nullable: false })
  @Prop({
    required: true
  })
  availableBook: number;

  @Field(() => Int, { name: 'createdAt', description: "The create time of book", nullable: false})
  @Prop({
    required: true
  })
  createdAt: number
  
  @Field(() => Int, { name: 'updatedAt', description: "The nearest update time of book", nullable: false})
  @Prop({
    required: true
  })
  updatedAt: number
}

export const BookSchema = SchemaFactory.createForClass(Book)