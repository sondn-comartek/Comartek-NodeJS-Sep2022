import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { UpdateImagePetInput } from './dto/update-image-pet.input';
import { InventoryPetOutput } from './dto/inventory-pet.output';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => Pet)
  async createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return await this.petsService.create(createPetInput);
  }

  @Query(() => InventoryPetOutput, { name: 'petInventory' })
  async petInventory() {
    return await this.petsService.petInventory();
  }

  @Query(() => [Pet], { name: 'pets' })
  async findAll() {
    return await this.petsService.findAll();
  }

  @Query(() => Pet, { name: 'findPetById' })
  async findById(@Args('id') id: string) {
    return await this.petsService.findById(id);
  }

  @Query(() => Pet, { name: 'findPetByTags' })
  async findByTags(@Args('tags') tags: string) {
    return await this.petsService.findByTags(tags);
  }

  @Query(() => Pet, { name: 'findPetByStatus' })
  async findPetByStatus(@Args('status') status: string) {
    return await this.petsService.findPetByStatus(status);
  }

  @Mutation(() => Pet)
  async updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return await this.petsService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  async updateImagePet(
    @Args('updateImagePetInput') updateImagePetInput: UpdateImagePetInput,
  ) {
    return await this.petsService.update(
      updateImagePetInput.id,
      updateImagePetInput,
    );
  }

  @Mutation(() => Pet)
  async removePet(@Args('id') id: string) {
    return await this.petsService.remove(id);
  }
}
