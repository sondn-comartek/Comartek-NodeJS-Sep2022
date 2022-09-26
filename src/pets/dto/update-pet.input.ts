import { CreatePetInput } from './create-pet.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { PetStatus } from '../enums/status.enum';

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tags: string;

  @Field({ nullable: true })
  status: PetStatus;

  @Field({ nullable: true })
  photoUrl: string;
}
