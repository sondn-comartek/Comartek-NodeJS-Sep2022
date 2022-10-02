import { Category } from './../../category/entities/category.entity';
import { CreateBookInput } from './create-book.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { FileUpload } from 'src/interfaces/file-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => String, { description: 'book id' })
  bookID: string;
  @Field(() => String, { description: 'book name' })
  book_title: string;
  @Field(() => String, { description: 'category of book' })
  category: string;
  @Field(() => Number, { description: 'volume' })
  volume: number;
  @Field(() => Number, { description: 'page number' })
  page: number;
  @Field(() => GraphQLUpload, { description: 'image of category' })
  image: Promise<FileUpload>;
  @Field(() => Number, { description: 'amount of book' })
  amount: number;
}
