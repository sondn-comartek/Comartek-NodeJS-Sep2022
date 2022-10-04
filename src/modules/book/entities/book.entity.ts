import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}



@ObjectType()
export class BorrowBookOutput {
  @Field(() => Int, {nullable: true})
  status: number
  @Field(() => String, {nullable: true})
  message: string
}
