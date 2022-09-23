import { CreatePetInput } from './../../pet/dto/create-pet.input';
import { InputType, Int, Field } from '@nestjs/graphql';
import { OrderStatus } from 'src/enums/order.status';

@InputType()
export class CreateOrderInput {
  @Field(() => [String], { description: 'List Pets in order' })
  pets: string[];
  @Field(() => Date, { description: 'Expected shipping date' })
  shipping_date: Date;
  @Field(() => OrderStatus, { description: 'order of status' })
  status: OrderStatus;
}
