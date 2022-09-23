import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhotoResponseType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  url: string;
}
