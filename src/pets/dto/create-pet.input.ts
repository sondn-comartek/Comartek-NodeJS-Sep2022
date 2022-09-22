import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePetInput {
  @Field()
  category: string;

  @Field()
  name: string;

  @Field()
  tags: string;

  @Field()
  photoUrl: string;
}
