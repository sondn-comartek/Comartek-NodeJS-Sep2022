import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponseType {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  readonly userName?: string;

  @Field(() => String)
  readonly email?: string;

  @Field(() => String)
  readonly firstName?: string;

  @Field(() => String)
  readonly lastName?: string;

  @Field(() => String)
  readonly phone?: string;

  @Field(() => String)
  readonly status?: string;

  @Field(() => String)
  readonly role?: string;
}
