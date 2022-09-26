import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PlaceOrderInput {
  @Field(() => [String])
  petsID: [string]

  @Field(() => Date)
  shipingDate: Date

  @Field(() => String)
  OrderStatus: string
}
