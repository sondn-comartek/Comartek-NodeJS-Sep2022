import { FileUpload } from './../types/file-upload.type';
import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class UploadImageInput {
  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
