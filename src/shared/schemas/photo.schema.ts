import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'photos',
  _id: false,
  timestamps: true,
})
@ObjectType()
export class Photo {
  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly id: string;

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
  })
  readonly url: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
