import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookItemInput {
  @Field(() => String)
  bookId: string;
}
