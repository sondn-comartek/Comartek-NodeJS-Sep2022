import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExportInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
