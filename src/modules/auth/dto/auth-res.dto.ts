import { User } from '../../user/entities/user.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResDto {
  @Field(() => String)
  access_token: string;
  @Field(() => User)
  user: User;
}
