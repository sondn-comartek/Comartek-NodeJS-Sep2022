import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './category.schema';
import { Tag } from './tag.schema';
import { PetStatus } from '../enums/pet-status.enum';
import mongoose from 'mongoose';
import { Photo } from './photo.schema';

@Schema({
  collection: 'pets',
  timestamps: true,
})
@ObjectType()
export class Pet {
  @Field(() => String)
  @Prop({
    type: String,
    unique: true,
    required: true,
    default: () => uuidv4(),
  })
  id: string;

  @Field(() => [String])
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Category.name,
  })
  categories: [Category];

  @Field(() => [String])
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Tag.name,
  })
  tags: [Tag];

  @Field(() => [String])
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Photo.name,
    default: ["1"] // default photo on DB
  })
  photos: [Photo];

  @Field(() => String)
  @Prop({
    type: String,
    reuqired: true,
    default: PetStatus.Avalible,
  })
  status: PetStatus;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
