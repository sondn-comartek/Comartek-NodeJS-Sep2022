import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../interfaces/upload-image.interface';

@InputType()
export class CreateManagePetInput {
  @IsString()
  @Field({ name: 'category', description: 'Category of pet', nullable: false })
  category: string;

  @IsString()
  @Field({ name: 'name', description: 'Name of pet', nullable: false })
  name: string;

  @IsString()
  @Field({ name: 'tag', description: 'Tag of pet', nullable: false })
  tag: string;

  @IsString()
  @Field({ name: 'status', description: 'Status of pet', nullable: false })
  status: string;

  @IsNumber()
  @Field({ name: 'price', description: 'Price of pet', nullable: false })
  price: number;

  @Field(() => GraphQLUpload, { name: 'image', description: 'Image of pet', nullable: false })
  image: Promise<FileUpload>
}