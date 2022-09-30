import { InputType, Int, Field } from '@nestjs/graphql';
import { FileUpload } from 'src/interfaces/file-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'category name' })
  name: string;
  @Field(() => GraphQLUpload, { description: 'image of category' })
  image: Promise<FileUpload>;
}
