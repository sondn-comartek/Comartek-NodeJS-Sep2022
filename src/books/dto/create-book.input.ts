import { InputType, Int, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/interfaces/file-upload.interface';

@InputType()
export class CreateBookInput {
  @Field()
  categoryId: string;

  @Field()
  name: string;

  @Field(() => Int)
  part: number;

  @Field(() => Int)
  numberOfPages: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;

  @Field(() => Int)
  widthImage: number;
}
