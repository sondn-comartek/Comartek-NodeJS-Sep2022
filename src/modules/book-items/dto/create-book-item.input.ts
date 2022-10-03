import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookItemInput {
  @Field()
  bookId: string;
}
