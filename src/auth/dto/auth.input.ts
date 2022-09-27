import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field(() => String, { description: 'Email using login' })
  email: string;
  @Field(() => String, { description: 'password of account' })
  password: string;
}
