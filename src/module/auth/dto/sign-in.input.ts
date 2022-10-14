import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";

@InputType()
export class SignInInput {
  @IsString()
  @IsEmail()
  @Field({ name: 'email', description: 'Email that user use to sign in', nullable: false })
  email: string;

  @IsString()
  @MinLength(8)
  @Field({ name: 'password', description: 'Password that user use to sign in', nullable: false })
  password: string;
}