import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'categories',
  _id: false,
  timestamps: true,
})
export class Category {}

export const CategorySchema = SchemaFactory.createForClass(Category);
