import { ObjectType, Field } from '@nestjs/graphql';
import { BookStatus } from 'src/modules/book/enums/status.enum';

@ObjectType()
export class BookCategory {
  @Field(() => String, { description: 'category id' })
  categoryID: string;
  @Field(() => String, { description: 'category name' })
  name: string;
  @Field(() => String, { description: 'photo_id' })
  photo_id: string;
  @Field(() => Number, { description: 'total book of category' })
  total: number;
  @Field(() => BookStatus, { description: 'status of books above' })
  status: BookStatus;
}
