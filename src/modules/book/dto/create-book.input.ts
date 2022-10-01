import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'book name' })
  book_title: string;
  @Field(() => String, { description: 'category of book' })
  category: string;
  @Field(() => Number, { description: 'volume' })
  volume: number;
  @Field(() => Number, { description: 'page number' })
  page: number;
  @Field(() => String, { description: 'image of category' })
  photo_id: string;
}
