import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RequireCSVOutput {
  @Field(() => Int)
  status: number
  @Field(() => String)
  message: string
}
