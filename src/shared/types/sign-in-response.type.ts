import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
