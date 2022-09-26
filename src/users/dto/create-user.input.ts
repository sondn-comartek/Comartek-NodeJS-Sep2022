import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field({ name: 'userName', description: 'Username of user', nullable: false})
  userName: string;

  @IsString()
  @Field({ name: 'firstName', description: 'Firstname of user', nullable: false})
  firstName: string;

  @IsString()
  @Field({ name: 'lastName', description: 'Last name of user', nullable: false})
  lastName: string;

  @IsString()
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
}
