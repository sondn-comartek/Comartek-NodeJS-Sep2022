import { CreateUploadInput } from './create-upload.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUploadInput extends PartialType(CreateUploadInput) {
  @Field(() => String)
  id: string;
}
