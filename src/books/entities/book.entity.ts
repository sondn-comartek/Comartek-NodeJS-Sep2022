import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field()
  id: string;

  @Field()
  categoryId: string;

  @Field()
  name: string;

  @Field(() => Int)
  part: number;

  @Field(() => Int)
  numberOfPages: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  image: string;
}
