import { CreateExportInput } from './create-export.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExportInput extends PartialType(CreateExportInput) {
  @Field(() => Int)
  id: number;
}
