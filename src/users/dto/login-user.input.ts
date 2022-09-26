import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsString()
  @Field({ name: 'email', description: 'Email of user', nullable: false})
  email: string;

  @IsString()
  @Field({ name: 'password', description: 'Password of the account', nullable: false})
  password: string;
}
