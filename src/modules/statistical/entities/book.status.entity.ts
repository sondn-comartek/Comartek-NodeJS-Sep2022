import { ObjectType, Field } from '@nestjs/graphql';
import { BookStatus } from 'src/modules/book/enums/status.enum';

@ObjectType()
export class BookValid {
  @Field(() => Number, { description: 'Book total' })
  total: number;
  @Field(() => Number, { description: 'Book valid' })
  book_valid: number;
  @Field(() => Number, { description: 'Book invalid' })
  book_invalid: number;
}
