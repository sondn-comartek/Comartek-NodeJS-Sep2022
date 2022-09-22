import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from 'src/shared/inputs';
import { Pet } from '../shared/schemas/pet.schema';
import { PetService } from './pet.service';

@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Query(() => String)
  async findAllPet(): Promise<string> {
    return 'findAllPet';
  }

  @Query(() => String)
  async findPetById(): Promise<string> {
    return 'findAllPet';
  }

  @Mutation(() => Pet)
  async createPet(
    @Args({ name: 'createPetInput', type: () => CreatePetInput })
    createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return await this.petService.createPet(createPetInput);
  }
}
