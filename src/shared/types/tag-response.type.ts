import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagResponseType {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;
}
