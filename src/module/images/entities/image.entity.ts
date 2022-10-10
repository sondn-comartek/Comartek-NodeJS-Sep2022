import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ImageDocument = Image & Document;

@Schema()
@ObjectType()
export class Image {
  @Field(() => String)
  @Prop({
    required: true
  })
  imageId: string

  @Field(() => String)
  @Prop({
    required: true
  })
  originalFilePath: string

  @Field(() => String)
  @Prop({
    required: true
  })
  thumbnailFilePath: string

  @Field(() => Number)
  @Prop({
    required: true
  })
  createdAt: number

  @Field(() => Number)
  @Prop({
    required: true
  })
  updatedAt: number
}

export const ImageSchema = SchemaFactory.createForClass(Image);