import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/auth/dto/register-auth.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  phone?: string;
}
