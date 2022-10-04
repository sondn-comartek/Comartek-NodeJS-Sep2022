import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class OrderAction {
  @Field(() => String)
  orderid: string;

  @Field(() => String)
  action: string;
}
