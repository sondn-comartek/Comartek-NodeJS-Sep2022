import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => String)
  id: string

  @Field(() => String)
  username: string

  @Field(() => String)
  firstname: string

  @Field(() => String)
  lastname: string

  @Field(() => String)
  email: string
}


@ObjectType()
export class DeleteUserOutPut {
  @Field(() => Int)
  status: number

  @Field(() => String)
  message: string
}