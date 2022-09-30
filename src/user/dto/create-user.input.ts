import { InputType, Int, Field } from '@nestjs/graphql';
import { Role } from 'src/enums/roles.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email of User' })
  email: string;
  @Field(() => String, { description: 'password of account' })
  password: string;
  @Field(() => Role, {
    description: 'role of account',
    defaultValue: Role.user,
  })
  role: Role;
}
