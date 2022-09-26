import { CreateManagePetInput } from './create-manage-pet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateManagePetInput extends PartialType(CreateManagePetInput) {
  @IsInt()
  @Field(() => Int)
  petId: number;
}
