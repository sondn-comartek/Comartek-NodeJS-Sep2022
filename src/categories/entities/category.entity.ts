import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;
}
