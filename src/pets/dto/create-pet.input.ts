import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../interfaces/file-upload.interface';

@InputType()
export class CreatePetInput {
  @Field()
  category: string;

  @Field()
  name: string;

  @Field()
  tags: string;

  @Field()
  photoUrl: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
