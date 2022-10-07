import { CreateBookItemInput } from './create-book-item.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookItemInput extends PartialType(CreateBookItemInput) {
  @Field(() => String)
  id: string;
}
