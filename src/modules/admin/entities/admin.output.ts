import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AdminCreateBookOutPut {
  @Field(() => [String])
  bookIds: [string]
}


@ObjectType()
export class BookOutPut {
  @Field(() => String)
  id: string

  @Field(() => String) 
  name: string
}

@ObjectType()
export class UserOutPut {

  @Field(() => String)
  username: string

  @Field(() => String )
  firstname: string

  @Field(() => String )
  lastname: string

  @Field(() => String )
  phone: string

  @Field(() => [BookOutPut])
  borrowBook: BookOutPut[]

  @Field(() => Int)
  numberBorrow: number

}