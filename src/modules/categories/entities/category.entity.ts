import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ObjectType, Field } from '@nestjs/graphql';
import * as dayjs from 'dayjs';

export type CategoryDocument = Category & Document;

@ObjectType()
@Schema()
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

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  createdAt: string;

  @Prop({ required: true, default: dayjs(new Date()).unix() })
  updatedAt: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
