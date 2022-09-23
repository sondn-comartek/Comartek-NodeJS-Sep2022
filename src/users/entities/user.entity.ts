import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';
import { UserStatus } from '../enums/status.enum';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field()
  status: UserStatus;

  @Field()
  role: Role;
}
