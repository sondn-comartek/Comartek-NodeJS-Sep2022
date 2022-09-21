import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './category.schema';
import { Tag } from './tag.schema';
import { PetStatus } from '../enums/pet-status.enum';

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
    type: [String],
    required: true,
    ref: Category.name,
  })
  categoriesId: [string];

  @Field(() => [String])
  @Prop({
    type: [String],
    required: true,
    ref: Tag.name,
  })
  tagsId: string;

  @Field(() => String)
  @Prop({
    type: String,
    reuqired: true,
    default: PetStatus.Avalible,
  })
  status: PetStatus;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
