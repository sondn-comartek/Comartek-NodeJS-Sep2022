import { CreateBookItemInput } from './create-book-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookItemInput extends PartialType(CreateBookItemInput) {
  @Field(() => Int)
  id: number;
}
