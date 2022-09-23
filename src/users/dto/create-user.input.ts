import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  IsPhoneNumber,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  @Field()
  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('VN')
  phone: string;
}
