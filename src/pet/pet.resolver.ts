import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pet } from '../shared/schemas/pet.schema';

@Resolver()
export class PetResolver {
  @Query(() => [Pet])
  async findAllPet() {
    return 'findAllPet';
  }

  @Mutation(() => String)
  async createPet() {
    return 'Only admin can create a new pet';
  }
}
