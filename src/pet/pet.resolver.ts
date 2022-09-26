import { QueryMongoIdArrayInput } from './../shared/inputs/query-mongo-id-array-input';
import { QueryMongoIdInput } from './../shared/inputs/query-mongo-id.input';
import { PetResponseType } from './../shared/types/pet-response.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from 'src/shared/inputs';
import { PetService } from './pet.service';
import { UpdatePetInput } from '../shared/inputs/update-pet.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { Admin } from 'src/authentication/decorators/admin.decorator';

@Resolver()
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Query(() => [PetResponseType])
  async findAllPet() {
    return await this.petService.findAllPet();
  }

  @Query(() => PetResponseType)
  async findPetById(
    @Args({ name: 'queryMongoIdInput', type: () => QueryMongoIdInput })
    queryMongoIdInput: QueryMongoIdInput,
  ) {
    return await this.petService.findPetById(queryMongoIdInput.id);
  }

  @Mutation(() => PetResponseType)
  @UseGuards(JwtAuthGuard)
  async createPet(
    @Admin() admin: any,
    @Args({ name: 'createPetInput', type: () => CreatePetInput })
    createPetInput: CreatePetInput,
  ): Promise<PetResponseType> {
    return await this.petService.createPet(createPetInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updatePetById(
    @Admin() admin: any,
    @Args({ name: 'queryMongoIdInput', type: () => QueryMongoIdInput })
    queryMongoIdInput: QueryMongoIdInput,
    @Args({ name: 'updatePetInput', type: () => UpdatePetInput })
    updatePetInput: UpdatePetInput,
  ) {
    return await this.petService.updatePetById(
      queryMongoIdInput.id,
      updatePetInput,
    );
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deletePetById(
    @Admin() admin: any,
    @Args({ name: 'queryMongoIdInput', type: () => QueryMongoIdInput })
    queryMongoIdInput: QueryMongoIdInput,
  ) {
    return await this.petService.deletePetById(queryMongoIdInput.id);
  }

  @Query(() => [PetResponseType])
  async findPetByTags(
    @Args({
      name: 'queryMongoIdArrayInput',
      type: () => QueryMongoIdArrayInput,
    })
    queryMongoIdArrayInput: QueryMongoIdArrayInput,
  ) {
    return await this.petService.findPetByTagIds(queryMongoIdArrayInput.ids);
  }

  @Query(() => [PetResponseType])
  async findPetByStatus(
    @Args({ name: 'status', type: () => String }) status: string,
  ) {
    return await this.petService.findPetByStatus(status);
  }
}
