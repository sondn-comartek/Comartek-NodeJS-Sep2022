import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/interfaces/file-upload.interface';

@InputType()
export class CreateUploadInput {
  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
