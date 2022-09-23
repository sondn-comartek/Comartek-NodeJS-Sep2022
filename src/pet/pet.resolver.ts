import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from 'src/shared/inputs';
import { PetService } from './pet.service';
import { PetResponseType } from '../shared/types/pet-response.type';
import { UpdatePetInput } from '../shared/inputs/update-pet.input';

@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Query(() => [PetResponseType])
  async findAllPet() {
    return await this.petService.findAllPet();
  }

  @Query(() => PetResponseType)
  async findPetById(@Args({ name: 'id', type: () => String }) id: string) {
    return await this.petService.findPetById(id);
  }

  @Mutation(() => PetResponseType)
  async createPet(
    @Args({ name: 'createPetInput', type: () => CreatePetInput })
    createPetInput: CreatePetInput,
  ): Promise<PetResponseType> {
    return await this.petService.createPet(createPetInput);
  }

  @Mutation(() => String)
  async updatePetById(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'updatePetInput', type: () => UpdatePetInput })
    updatePetInput: UpdatePetInput,
  ) {
    return await this.petService.updatePetById(id, updatePetInput);
  }

  @Mutation(() => String)
  async deletePetById(@Args({ name: 'id', type: () => String }) id: string) {
    return await this.petService.deletePetById(id);
  }

  @Query(() => String)
  async findPetByTags() {
    return 'findPetByTag';
  }

  @Query(() => String)
  async findPetByStatus() {
    return 'findPetByStatus';
  }
}
