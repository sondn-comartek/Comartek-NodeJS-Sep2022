import { InputType, Field, Int } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/interfaces/file-upload.interface';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;

  @Field(() => Int)
  widthImage: number;
}
