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

  @Field(() => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Field(() => Category)
  @Prop({
    type: Category,
    required: true,
    unique: false
  })
  category: Category;

  @Field(() => [Tag])
  @Prop({
    type: Array,
    required: true,
    unique: false
  })
  tags: [Tag];

  @Field(() => [String])
  @Prop({
    type: Array,
    requried: true,
    default: []
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
