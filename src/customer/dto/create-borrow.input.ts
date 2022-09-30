import { InputType, Field } from '@nestjs/graphql';
import { FileUpload } from 'src/interfaces/file-upload';
@InputType()
export class CreateBorrowInput {
  @Field(() => String, { description: 'user id' })
  userId: string;
  @Field(() => [String], { description: 'book ids' })
  bookIds: string[];
}
