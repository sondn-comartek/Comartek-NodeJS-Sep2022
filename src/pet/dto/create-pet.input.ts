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
  @Field(() => String, { description: 'status of pet' })
  status: string;
  @Field(() => String, { description: 'photo url of pet' })
  photo_urls: string;
}
