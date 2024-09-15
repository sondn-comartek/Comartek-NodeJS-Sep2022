import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PetStatus } from 'src/enums/pet.status';
export type PetDocument = Pet & Document;
@Schema({ timestamps: true, collection: 'pets' })
@ObjectType()
export class Pet {
  @Field(() => String, { description: 'pet of category' })
  @Prop({ required: true, unique: true })
  petID: string;
  @Field(() => String, { description: 'pet of category' })
  @Prop()
  category: string;
  @Field(() => String, { description: 'name of pet' })
  @Prop()
  name: string;
  @Field(() => [String], { description: 'pet have tags' })
  @Prop()
  tags: string[];
  @Field(() => PetStatus, {
    description: 'status of pet',
    defaultValue: PetStatus.available,
  })
  @Prop()
  status: PetStatus;
  @Field(() => String, { description: 'photo url of pet' })
  @Prop()
  photo_urls: string;
  @Field(() => Number, { description: 'price of pet' })
  @Prop()
  price: number;
}
export const PetSchema = SchemaFactory.createForClass(Pet);
