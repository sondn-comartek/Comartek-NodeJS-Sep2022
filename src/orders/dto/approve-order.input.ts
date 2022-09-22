import { CreateOrderInput } from './create-order.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { OrderStatus } from '../enums/status.enum';

@InputType()
export class ApproveOrderInput extends PartialType(CreateOrderInput) {
  @Field()
  id: string;

  @Field()
  status: OrderStatus;
}
