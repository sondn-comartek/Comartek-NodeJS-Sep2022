import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ImageDocument = Image & Document;

@Schema({
  timestamps: true
})
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
}

export const ImageSchema = SchemaFactory.createForClass(Image);