import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field({ name: 'username', description: 'Username of user', nullable: false})
  username: string;

  @IsString()
  @Field({ name: 'firstName', description: 'Firstname of user', nullable: false})
  firstName: string;

  @IsString()
  @Field({ name: 'lastName', description: 'Last name of user', nullable: false})
  lastName: string;

  @IsString()
  @IsEmail()
  @Field({ name: 'email', description: 'Email of user', nullable: false})
  email: string;

  @IsString()
  @Field({ name: 'password', description: 'Password of the account', nullable: false})
  password: string;
  
  @IsString()
  @Field({ name: 'confirmPassword', description: 'Confirm password that match the password', nullable: false})
  confirmPassword: string;
  
  @IsString()
  @Field({ name: 'phone', description: 'Phone number of user', nullable: false})
  phone: string;

  @IsString()
  @Field(() => String, { name: 'city', nullable: false })
  city: string;
}
