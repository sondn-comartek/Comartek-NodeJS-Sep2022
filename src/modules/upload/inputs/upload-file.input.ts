import { FileInterface } from './../interfaces/file.interface';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class UploadFileInput {
  @Field(() => GraphQLUpload)
  readonly file: Promise<FileInterface>;

  @Field(() => Int)
  @IsNumber()
  readonly width: number;

  @Field(() => Int)
  @IsNumber()
  readonly height: number;
}
