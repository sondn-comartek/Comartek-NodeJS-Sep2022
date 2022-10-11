
import { InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class BorrowBookInput {
  @Field(() => String)
  bookid: string;
}
