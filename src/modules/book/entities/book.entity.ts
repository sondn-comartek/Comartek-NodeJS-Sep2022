import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}



@ObjectType()
export class BorrowBookOutput {
  @Field(() => Int)
  status: number
  @Field(() => String)
  message: string
}
