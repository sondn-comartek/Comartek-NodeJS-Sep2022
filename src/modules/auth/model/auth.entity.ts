import { ObjectType, Field, Int, PartialType } from '@nestjs/graphql';
import { SignInOutput } from './auth.output';


@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String)
  username: string

  @Field(() => String)
  firstname: string
  
  @Field(() => String)
  lastname: string

  @Field(() => String)
  phone: string
}

@ObjectType()
export class UserInfo {
  @Field(() => String)
  id: string
  
  @Field(() => String) 
  username: string

  @Field(() => String)
  firstname: string

  @Field(() => String)
  lastname: string

  @Field(() => String)
  phone: string
}

@ObjectType()
export class Auth extends PartialType(SignInOutput) {
  @Field(() => String)
  id: string
  @Field(() => UserInfo)
  user: UserInfo
  
}
