import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;
@ObjectType()
@Schema({ timestamps: true })
export class Media {
  @Field(() => String, { description: 'media id' })
  @Prop({ required: true, unique: true })
  mediaID: string;
  @Field(() => String, { description: 'description of media' })
  @Prop()
  description?: string;
  @Field(() => String, { description: 'url of media' })
  @Prop({ required: true })
  media_urls: string;
}
export const MediaSchema = SchemaFactory.createForClass(Media);
