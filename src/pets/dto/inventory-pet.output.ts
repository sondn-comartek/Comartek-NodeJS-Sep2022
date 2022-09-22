import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { PetStatus } from '../enums/status.enum';
import { Pet } from '../schemas/pet.schema';

export class PetItem {
  @Field()
  petId: string;

  @Field()
  status: PetStatus;
}

// @ObjectType
export class InventoryPetOutput {
  @Field()
  pets: [Pet];

  @Field()
  available: number;
}
