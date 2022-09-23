import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { UpdateImagePetInput } from './dto/update-image-pet.input';
import { InventoryPetOutput } from './dto/inventory-pet.output';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => Pet)
  @UseGuards(JwtAuthGuard)
  async createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return await this.petsService.create(createPetInput);
  }

  @Query(() => InventoryPetOutput, { name: 'petInventory' })
  @UseGuards(JwtAuthGuard)
  async petInventory() {
    return await this.petsService.petInventory();
  }

  @Query(() => [Pet], { name: 'pets' })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.petsService.findAll();
  }

  @Query(() => Pet, { name: 'findPetById' })
  @UseGuards(JwtAuthGuard)
  async findById(@Args('id') id: string) {
    return await this.petsService.findById(id);
  }

  @Query(() => Pet, { name: 'findPetByTags' })
  @UseGuards(JwtAuthGuard)
  async findByTags(@Args('tags') tags: string) {
    return await this.petsService.findByTags(tags);
  }

  @Query(() => Pet, { name: 'findPetByStatus' })
  @UseGuards(JwtAuthGuard)
  async findPetByStatus(@Args('status') status: string) {
    return await this.petsService.findPetByStatus(status);
  }

  @Mutation(() => Pet)
  @UseGuards(JwtAuthGuard)
  async updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return await this.petsService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  @UseGuards(JwtAuthGuard)
  async updateImagePet(
    @Args('updateImagePetInput') updateImagePetInput: UpdateImagePetInput,
  ) {
    return await this.petsService.update(
      updateImagePetInput.id,
      updateImagePetInput,
    );
  }

  @Mutation(() => Pet)
  @UseGuards(JwtAuthGuard)
  async removePet(@Args('id') id: string) {
    return await this.petsService.remove(id);
  }
}
