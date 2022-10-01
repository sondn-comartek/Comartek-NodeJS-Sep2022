import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;
@Schema({ timestamps: true })
@ObjectType()
export class Category {
  @Field(() => String, { description: 'category name' })
  @Prop({ required: true })
  name: string;
  @Field(() => String, { description: `category's avatar` })
  @Prop()
  photo_id: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
