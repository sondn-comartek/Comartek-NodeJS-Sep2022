import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => String, { description: 'user id' })
  userID: string;
  @Field(() => String, { description: 'book id' })
  bookID: string;
  @Field(() => Date, { description: 'borrowed date' })
  borrowed_date: Date;
  @Field(() => Date, { description: 'return data' })
  return_data: Date;
}
