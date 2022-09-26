import { PetStatus } from './../../enums/pet.status';
import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/interfaces/file-upload';
// import {} from "class-validator"
@InputType()
export class CreatePetInput {
  @Field(() => String, { description: 'pet of category' })
  category: string;
  @Field(() => String, { description: 'name of pet' })
  name: string;
  @Field(() => [String], { description: 'pet have tags' })
  tags: string[];
  @Field(() => PetStatus, { description: 'status of pet' })
  status: PetStatus;
  @Field(() => Number, { description: 'price of pet' })
  price: number;
  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
