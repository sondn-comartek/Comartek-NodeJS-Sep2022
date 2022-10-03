import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
