import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ManagePetDocument = ManagePet & Document

@Schema({
  timestamps: true,
  collection: 'pets'
})  

@ObjectType()
export class ManagePet {
  @Field(() => Int, { name: 'petId', description: 'ID of the pet', nullable: false })
  @Prop({
    required: true  
  })
  petId: number;

  @Field({ name: 'category', description: 'Category of pet', nullable: false })
  @Prop({
    required: true  
  })
  category: string;

  @Field({ name: 'name', description: 'Name of pet', nullable: false })
  @Prop({
    required: true  
  })
  name: string;

  @Field({ name: 'tag', description: 'Tag of pet', nullable: false })
  @Prop({
    required: true  
  })
  tag: string;

  @Field({ name: 'status', description: 'Status of pet', nullable: false })
  @Prop({
    required: true  
  })
  status: string;

  @Field(() => [String], { name: 'photoUrl', description: 'Url of photo of pet', nullable: true })
  @Prop({
    required: true  
  })
  photoUrl: string[];

  @Field({ name: 'price', description: 'Price of pet', nullable: false })
  @Prop({
    required: true  
  })
  price: number;
}

export const PetSchema = SchemaFactory.createForClass(ManagePet)