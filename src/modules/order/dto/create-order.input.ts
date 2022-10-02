import { InputType, Int, Field } from '@nestjs/graphql';
import { OrderStatus } from '../enums/order.enum';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: 'user id' })
  userID: string;
  @Field(() => String, { description: 'book id' })
  bookID: string;
  @Field(() => Date, { description: 'borrowed date' })
  borrowed_date: Date;
  @Field(() => Date, { description: 'return data' })
  return_data: Date;
  @Field(() => OrderStatus, { description: 'return data' })
  status: OrderStatus;
}
