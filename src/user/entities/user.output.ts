import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BorrowBookOutput {
  @Field(() => Int)
  status: number
  @Field(() => String)
  message: string
}
