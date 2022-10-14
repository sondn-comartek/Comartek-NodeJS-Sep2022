import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/module/interfaces/upload-image.interface';

@InputType()
export class CreateImageInput {
  @Field(() => GraphQLUpload, { name: 'image', nullable: false })
  image: Promise<FileUpload>

  @IsInt()
  @Field(() => Int, { name: 'width', description: 'Width of image that user want to resize', nullable: false })
  width: number

  @IsInt()
  @Field(() => Int, { name: 'height', description: 'Height of image that user want to resize', nullable: false})
  height: number
}
