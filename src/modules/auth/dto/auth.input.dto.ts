import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
@InputType()
export class AuthInput {
  @IsEmail()
  @Field(() => String, { description: 'Email using login' })
  email: string;
  @Length(3, 32)
  @Field(() => String, { description: 'password of account' })
  password: string;
}
