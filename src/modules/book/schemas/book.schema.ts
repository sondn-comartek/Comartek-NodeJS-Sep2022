import { Media } from './../../media/schemas/media.schema';
import { Category } from './../../category/schemas/category.schema';
import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CodeHelper } from '../helpers/code.helper';

@ObjectType()
@Schema()
export class Book {
  @Field(() => ID)
  readonly _id: string;

  @Field(() => Category, { name: 'category' })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Category.name,
  })
  readonly categoryId: Types.ObjectId | Category;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly title: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
    default: () => CodeHelper.generate(),
  })
  readonly code: string;

  @Field(() => Media, { name: 'media' })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Media.name,
  })
  readonly mediaId: Types.ObjectId | string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    default: 'Book has no description',
  })
  readonly description: string;

  @Field(() => Int)
  @Prop({
    type: Number,
    required: true,
  })
  readonly pageTotal: number;

  @Field(() => Int)
  @Prop({
    type: Number,
    required: true,
  })
  readonly quantity: number;

  @Field(() => Int)
  @Prop({
    type: Number,
    required: true,
  })
  readonly available: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
