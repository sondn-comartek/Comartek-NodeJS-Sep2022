import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/module/interfaces/upload-image.interface';

@InputType()
export class CreateBookInput {
  @IsString()
  @Field(() => String, { name: 'bookName', description: 'Name of book', nullable: false })
  bookName: string;

  @IsString()
  @Field(() => String, { name: 'categoryId', description: 'Id of category that book belong to', nullable: false })
  categoryId: string;

  @IsInt()
  @Field(() => Int, { name: 'chapter', description: 'Chapter of book', nullable: false })
  chapter: number;

  @IsInt()
  @Field(() => Int, { name: 'totalPage', description: 'Total page of book', nullable: false })
  totalPage: number;

  @Field(() => GraphQLUpload, { name: 'bookImage', description: 'Image of book', nullable: false })
  bookImage: Promise<FileUpload>
  
  @IsInt()
  @Field(() => Int, { name: 'totalBook', description: "The number of book in the book's store", nullable: false })
  totalBook: number;

  @IsInt()
  @Field(() => Int, { name: 'availableBook', description: "The number of available book in book's store", nullable: false })
  availableBook: number;
}
