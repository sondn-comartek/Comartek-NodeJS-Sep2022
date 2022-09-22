import { IsEmail, Matches } from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';
@InputType()
export class LoginUserInput {
  @IsEmail()
  @Field(() => String, { description: 'email of user' })
  email: string;
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  @Field(() => String, { description: 'password of user' })
  password: string;
}
