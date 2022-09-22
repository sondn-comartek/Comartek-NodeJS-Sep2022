import { InputType, Field } from '@nestjs/graphql';
import { UpdatePetInput } from './update-pet.input';

@InputType()
export class UpdateImagePetInput extends UpdatePetInput {
  @Field()
  id: string;

  @Field()
  photoUrl: string;

  @Field()
  price: number;
}
