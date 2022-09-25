import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../enums';

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly status: OrderStatus;
}
