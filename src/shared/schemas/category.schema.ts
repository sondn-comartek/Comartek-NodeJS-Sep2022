// import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryResponseType } from '../types/category-response.type';
// import { v4 as uuidv4 } from 'uuid';

@Schema({
  collection: 'categories',
  timestamps: true,
})
// @ObjectType()
export class Category {
  // @Field(() => String)
  // @Prop({
  //   type: String,
  //   unique: true,
  //   required: true,
  //   default: () => uuidv4(),
  // })
  // id: string;

  // @Field(() => String)
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
