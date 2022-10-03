import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  collection: 'categories'
})
@ObjectType()
export class Category {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { name: 'categoryName', description: 'Name of category in the system', nullable: false })
  @Prop({
    required: true
  })
  categoryName: string;

  @Field(() => String, { name: 'imageUrl', description: 'Image url of category in the system', nullable: false })
  @Prop({
    required: true
  })
  imageUrl: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)