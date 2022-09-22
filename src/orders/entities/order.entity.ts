import { ObjectType, Field } from '@nestjs/graphql';
import { OrderStatus } from '../enums/status.enum';

@ObjectType()
export class Order {
  @Field()
  id: string;

  @Field(() => [String])
  petsId: [string];

  @Field()
  price: number;

  @Field()
  shipDate: Date;

  @Field()
  status: OrderStatus;
}
