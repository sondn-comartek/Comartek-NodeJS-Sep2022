import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/schemas/user.schema';

@ObjectType()
export class AuthResponseType {
  @Field(() => String)
  readonly accessToken: string;

  @Field(() => String)
  readonly refreshToken: string;

  @Field(() => User, { nullable: true })
  readonly user: User;
}
