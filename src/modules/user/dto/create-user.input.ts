import { InputType, Field } from '@nestjs/graphql';
import { Role } from 'src/modules/user/enums/roles.enum';
import { IsEmail, Length } from 'class-validator';
@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String, { description: 'Email of User' })
  email: string;
  @Length(3, 32)
  @Field(() => String, { description: 'password of account' })
  password: string;
  @Field(() => Role, {
    description: 'role of account',
    defaultValue: Role.user,
  })
  role: Role;
}
