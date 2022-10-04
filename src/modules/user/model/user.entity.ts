import { Field, Int, OmitType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';


@ObjectType()
export class User  {
  @Prop()
  @Field(() => String)
  id: string

  @Prop()
  @Field(() => String)
  username: string

  @Prop()
  @Field(() => String)
  firstname: string

  @Prop()
  @Field(() => String)
  lastname: string

  @Prop()
  @Field(() => String)
  email: string

  @Prop()
  @Field(() => String)
  password: string
  
  @Prop()
  @Field(() => String)
  phone: string

  @Prop()
  @Field(() => String)
  userstatus: string

  @Prop()
  @Field(() => String)
  role: string
}

@ObjectType()
export class UserEntity extends OmitType(User, ['password'] as const){}
