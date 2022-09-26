import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ManagePetService } from './manage-pet.service';
import { ManagePet } from './entities/manage-pet.entity';
import { CreateManagePetInput } from './dto/create-manage-pet.input';
import { UpdateManagePetInput } from './dto/update-manage-pet.input';
import { SearchManagePetInput } from './dto/search-manage-pet.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadPetImageInput } from './dto/upload-pet-image.input';

@Resolver(() => ManagePet)
export class ManagePetResolver {
  constructor(private readonly managePetService: ManagePetService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ManagePet)
  createManagePet(@Args('createManagePetInput') createManagePetInput: CreateManagePetInput) {
    return this.managePetService.create(createManagePetInput);
  }

  @Query(() => [ManagePet], { name: 'manageAllPet' })
  findAllPet() {
    return this.managePetService.findAll();
  }

  @Query(() => [ManagePet], { name: 'searchPet' })
  findPet(@Args('searchManagePetInput') searchManagePetInput: SearchManagePetInput) {
    return this.managePetService.findPet(searchManagePetInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ManagePet)
  updateManagePet(@Args('updateManagePetInput') updateManagePetInput: UpdateManagePetInput) {
    return this.managePetService.update(updateManagePetInput.petId, updateManagePetInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ManagePet, { name: 'deletePet' })
  removeManagePet(@Args('petId', { type: () => Int }) id: number) {
    return this.managePetService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ManagePet)
  uploadImage(@Args('uploadPetImageInput') uploadPetImageInput: UploadPetImageInput ) {
    return this.managePetService.uploadImage(uploadPetImageInput);
  }
}
