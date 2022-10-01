import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/interfaces/file-upload';
@InputType()
export class CreateMediaDto {
  @Field(() => String, { description: 'title of media' })
  description: string;
  @Field(() => GraphQLUpload, { description: 'image of category' })
  media: Promise<FileUpload>;
}
