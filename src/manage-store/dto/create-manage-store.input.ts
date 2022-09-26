import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateManageStoreInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
