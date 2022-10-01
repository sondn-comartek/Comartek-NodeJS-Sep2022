import { InputType, Int, Field } from '@nestjs/graphql';
import { FileUpload } from 'src/interfaces/file-upload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { IsString } from 'class-validator';
@InputType()
export class CreateCategoryInput {
  @IsString()
  @Field(() => String, { description: 'category name' })
  name: string;
  @Field(() => String, { description: 'image of category' })
  photo_id: string;
}
