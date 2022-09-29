import { ObjectType, Field } from '@nestjs/graphql';
import { LoanStatus } from '../enums/status.enum';

@ObjectType()
export class Loan {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  bookItemId: string;

  @Field()
  dateBorrow: Date;

  @Field()
  status: LoanStatus;
}
