import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pet } from '../shared/schemas/pet.schema';
import { PetService } from './pet.service';

@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService) { }
  @Query(() => [Pet])
  async findAllPet(): Promise<Pet[]> {
    return;
  }

  @Mutation(() => String)
  async createPet(): Promise<Pet> {
    return
  }
}
