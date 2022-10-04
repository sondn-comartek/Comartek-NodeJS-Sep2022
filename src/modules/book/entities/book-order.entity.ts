import { ObjectType, Field, Int } from '@nestjs/graphql';





@ObjectType()
export class BorrowOrderBook {
  @Field(() => String, {nullable: true})
  orderid: string

  @Field(() => String, {nullable: true})
  userid: string

  @Field(() => String, {nullable: true})
  bookid: string

  @Field(() => String, {nullable: true})
  status: string
}
