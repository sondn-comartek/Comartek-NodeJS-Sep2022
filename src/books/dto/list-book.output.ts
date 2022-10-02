import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ListBook {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  borrowed: number;

  @Field(() => Int)
  rest: number;
}
