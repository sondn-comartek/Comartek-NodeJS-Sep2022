import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'photos',
  timestamps: true,
})
@ObjectType()
export class Photo {
  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  url: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
