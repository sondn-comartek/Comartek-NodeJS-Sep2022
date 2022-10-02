import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { OrderStatus } from '../enums/order.enum';

@InputType()
export class UpdateOrderInput {
  @Field(() => String, { description: 'user id' })
  orderID: string;
  @Field(() => OrderStatus, { description: 'return data' })
  status: OrderStatus;
}
