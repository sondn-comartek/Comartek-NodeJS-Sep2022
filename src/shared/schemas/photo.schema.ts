import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'photos',
  _id: false,
  timestamps: true,
})
export class Photo {}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
