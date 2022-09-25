import { Field, Float, ObjectType } from '@nestjs/graphql';
import { PetResponseType } from './pet-response.type';
import { UserResponseType } from './user-response.type';
import { OrderStatus } from '../enums/order-status.enum';

@ObjectType()
export class OrderResponseType {
  @Field(() => String)
  readonly _id: string;

  @Field(() => UserResponseType, { nullable: true })
  readonly user?: any;

  @Field(() => [PetResponseType])
  readonly pets: PetResponseType[];

  @Field(() => String)
  readonly status: OrderStatus;

  @Field(() => Float)
  readonly price: number;

  @Field(() => Date)
  readonly expectedShippingDate: Date;
}
