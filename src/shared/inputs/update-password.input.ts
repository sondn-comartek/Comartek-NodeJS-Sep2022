import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly otp: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  // @Matches()
  readonly password: string;
}
