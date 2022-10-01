import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  readonly userName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly fullName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;
}
