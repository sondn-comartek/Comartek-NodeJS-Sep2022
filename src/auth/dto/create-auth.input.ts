import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
  
  @Field(() => Int, {description: "this is description"})
  exampltField2?: number
}
