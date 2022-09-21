import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}
