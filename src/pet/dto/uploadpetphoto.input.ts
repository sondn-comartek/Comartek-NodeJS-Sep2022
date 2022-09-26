import { InputType, Int, Field } from '@nestjs/graphql';
import { Stream } from 'stream';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
@InputType()
export class UploadPetPhotoInput {
  @Field(() => String)
  id: string

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
