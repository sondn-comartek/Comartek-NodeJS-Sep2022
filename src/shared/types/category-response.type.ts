import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryResponseType {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;
}
