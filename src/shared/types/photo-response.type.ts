import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhotoResponseType {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  url: string;
}
