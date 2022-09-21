import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly userName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly firstName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly lastName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  // Regex does not working
  // @Matches(RegExp(/?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/), {
  //     message: "Password must have at least 8 characters, 1 capitalized letter and 1 special character"
  // })
  readonly password: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  readonly phone: string;
}
