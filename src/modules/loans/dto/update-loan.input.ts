import { CreateLoanInput } from './create-loan.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLoanInput extends PartialType(CreateLoanInput) {
  @Field(() => String)
  id: string;
}
