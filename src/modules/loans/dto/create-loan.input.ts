import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLoanInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  bookItemId: string;
}
