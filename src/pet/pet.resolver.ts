import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from 'src/shared/inputs';
import { Pet } from '../shared/schemas/pet.schema';
import { PetService } from './pet.service';

@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService) { }

  // @Query(() => [Pet])
  // async findAllPet(): Promise<Pet[]> {
  //   return await this.petService.findAllPet();
  // }

  // @Query(() => String)
  // async findPetById(): Promise<string> {
  //   return 'findAllPet';
  // }

  // @Mutation(() => Pet)
  // async createPet(
  //   @Args({ name: 'createPetInput', type: () => CreatePetInput })
  //   createPetInput: CreatePetInput,
  // ): Promise<Pet> {
  //   return await this.petService.createPet(createPetInput);
  // }
}
