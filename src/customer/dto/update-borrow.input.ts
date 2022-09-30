import { InputType, Field } from '@nestjs/graphql';
import { BorrowStatus } from '../borrow.enums';
@InputType()
export class UpdateBorrowInput {
  @Field(() => String, { description: 'borrow id' })
  borrowId: string;
  @Field(() => BorrowStatus, { description: 'status borrow' })
  status: BorrowStatus;
}
