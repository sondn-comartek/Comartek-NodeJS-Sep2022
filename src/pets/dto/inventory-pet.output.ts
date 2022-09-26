import { Field, ObjectType } from '@nestjs/graphql';
import { Pet } from '../entities/pet.entity';
import { PetStatus } from '../enums/status.enum';

@ObjectType()
export class PetItem {
  @Field()
  petId: string;

  @Field()
  status: PetStatus;
}

@ObjectType()
export class InventoryPetOutput {
  @Field(() => [Pet])
  pets: [Pet];

  @Field()
  available: number;
}
