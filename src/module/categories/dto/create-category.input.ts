import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/module/interfaces/upload-image.interface';

@InputType()
export class CreateCategoryInput {
  @IsString()
  @Field(() => String, { name: 'categoryName', description: 'Name of category in the system', nullable: false })
  categoryName: string;

  @Field(() => GraphQLUpload, { name: 'image', description: 'Image of category', nullable: false })
  image: Promise<FileUpload>
}
