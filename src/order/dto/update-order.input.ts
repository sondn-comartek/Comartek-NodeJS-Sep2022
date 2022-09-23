import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { OrderStatus } from 'src/enums/order.status';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => String, { description: 'orderID of order' })
  orderID: string;
  @Field(() => OrderStatus, { description: 'status of order' })
  status: OrderStatus;
}
