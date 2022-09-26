import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { FindPetWidthStatus } from 'src/pet/dto/pet.input';
import { FindPetByStatus } from './entities/store.output';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}
  @Query(() => FindPetByStatus)
  async findPetWithStatus(@Args('petStatus') ip: FindPetWidthStatus) {
    const pets = await this.storeService.findByStatus(ip.status)
    return {
      pets: pets,
      totalPets: pets.length
    };
  }
}
