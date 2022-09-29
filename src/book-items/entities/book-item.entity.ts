import { ObjectType, Field } from '@nestjs/graphql';
import { StatusBookItem } from '../enums/status.enum';

@ObjectType()
export class BookItem {
  @Field()
  id: string;

  @Field()
  bookId: string;

  @Field()
  status: StatusBookItem;
}
