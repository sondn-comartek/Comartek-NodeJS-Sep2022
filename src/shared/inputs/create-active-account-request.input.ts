import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateActiveAccountRequestInput {
  @Field(() => String)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
