import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'photos',
  _id: false,
  timestamps: true,
})
@ObjectType()
export class Photo { }

export const PhotoSchema = SchemaFactory.createForClass(Photo);
