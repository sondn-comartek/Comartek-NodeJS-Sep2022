import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ObjectType, Field } from '@nestjs/graphql';

export type CategoryDocument = Category & Document;

@ObjectType()
@Schema({
  timestamps: true,
})
export class Category {
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
  name: string;

  @Field(() => String)
  @Prop({ required: true })
  imageId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
