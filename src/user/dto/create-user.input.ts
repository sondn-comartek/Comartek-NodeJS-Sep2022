import { InputType, Int, Field } from '@nestjs/graphql';
import { Roles } from 'src/enums/roles.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email of User' })
  email: string;
  @Field(() => String, { description: 'password of account' })
  password: string;
  @Field(() => Roles, {
    description: 'role of account',
    defaultValue: Roles.user,
  })
  role: Roles;
}
