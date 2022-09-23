// import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { v4 as uuidv4 } from 'uuid';
import { Category } from './category.schema';
import { Tag } from './tag.schema';
import { PetStatus } from '../enums/pet-status.enum';
import mongoose from 'mongoose';
import { Photo } from './photo.schema';

@Schema({
  collection: 'pets',
  timestamps: true,
})
export class Pet {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  categoryId: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: Tag.name,
    required: true,
    unique: false,
  })
  tagsId: string[];

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: Photo.name,
    requried: true,
    default: [],
  })
  photosId: string[];

  @Prop({
    type: String,
    reuqired: true,
    default: PetStatus.Avalible,
  })
  status: PetStatus;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
