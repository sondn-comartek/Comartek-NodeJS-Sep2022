import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { BookStatus } from 'src/modules/book/enums/status.enum';
@InputType()
export class BooksCategoryDto {
  @Field(() => String, { description: 'category id' })
  categoryID: string;
  @Field(() => String, { description: 'category name' })
  name: string;
  @Field(() => String, { description: 'photo_id' })
  photo_id: string;
  @Field(() => Number, { description: 'total book of category' })
  total: number;
  @Field(() => String, { description: 'status of books above' })
  status: BookStatus;
}
