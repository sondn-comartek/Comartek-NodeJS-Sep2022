import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Media } from 'src/modules/media/schemas/media.schema';

@ObjectType()
@Schema({
  collection: 'categories',
  timestamps: true,
})
export class Category {
  @Field(() => ID)
  readonly _id: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly name: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly code: string;

  @Field(() => String)
  @Prop({
    type: Types.ObjectId,
    ref: Media.name,
    required: true,
  })
  readonly mediaId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
