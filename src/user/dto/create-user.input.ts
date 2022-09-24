import { InputType, Int, Field } from '@nestjs/graphql';
import { UserStatus } from 'src/enums/user.status';
import { IsEmail, IsPhoneNumber, Matches } from 'class-validator';
@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'username of user' })
  username: string;
  @Field(() => String, { description: 'first name of user' })
  first_name: string;
  @Field(() => String, { description: 'last name of user' })
  last_name: string;
  @IsEmail()
  @Field(() => String, { description: 'email of  user' })
  email: string;
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  @Field(() => String, { description: 'password of user' })
  password: string;
  @IsPhoneNumber()
  @Field(() => String, { description: 'phone number of user' })
  phone: string;
  @Field(() => UserStatus, {
    description: 'status of user in system',
    defaultValue: UserStatus.inactive,
  })
  status: UserStatus;
}
