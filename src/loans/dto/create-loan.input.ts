import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLoanInput {
  @Field()
  userId: string;

  @Field()
  bookItemId: string;
}
