import { CreateRentInput } from './create-rent.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRentInput extends PartialType(CreateRentInput) {
  @Field(() => Int)
  id: number;
}
