import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PlaceOrderInput {
  @Field(() => [String])
  petsID: [string]

  @Field(() => Date)
  shipingDate: Date

}

@InputType()
export class ChangeStatusOrderInput {
  @Field(() => String)
  orderid: string

  @Field(() => String)
  status: string

}


@InputType()
export class FindOrderByIdInput {
  @Field(() => String)
  orderid: string

 
}


@InputType()
export class DeleteOrderInput {
  @Field(() => String)
  orderid: string

 
}
