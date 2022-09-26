import { CreateManageStoreInput } from './create-manage-store.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateManageStoreInput extends PartialType(CreateManageStoreInput) {
  @Field(() => Int)
  id: number;
}
