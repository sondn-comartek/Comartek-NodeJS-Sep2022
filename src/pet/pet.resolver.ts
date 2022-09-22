import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Mutation(() => Pet)
  async createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return await this.petService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'pets' })
  async findAll() {
    return await this.petService.findAll();
  }

  @Query(() => [Pet], { name: 'pet' })
  async findOne(
    @Args('petID', { type: () => String }) id: string,
    @Args('tags', { type: () => [String] }) tags: string[],
    @Args('status', { type: () => String }) status: string,
  ) {
    return await this.petService.findByFields(id, tags, status);
  }

  @Mutation(() => Pet)
  updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return this.petService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => Int }) id: number) {
    return this.petService.remove(id);
  }
}
