import { PetStatus } from './../../enums/pet.status';
import { InputType, Field } from '@nestjs/graphql';
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
  @Field(() => String, { description: 'photo url of pet' })
  photo_urls: string;
  @Field(() => Number, { description: 'price of pet' })
  price: number;
}
