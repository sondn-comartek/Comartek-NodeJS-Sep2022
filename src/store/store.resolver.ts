import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { Store } from './entities/store.entity';
import { FindPetWidthStatus } from 'src/pet/dto/pet.input';
import { FindPetByStatus, StatusAndMessage } from './entities/store.output';
import { PlaceOrderInput } from './dto/store.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from 'src/schema/pet.schema';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService
   
    ) {}
  @Query(() => FindPetByStatus)
  async findPetWithStatus(@Args('petStatus') ip: FindPetWidthStatus) {
    const pets = await this.storeService.findByStatus(ip.status)
    return {
      pets: pets,
      totalPets: pets.length
    };
  }

  @Query(() => StatusAndMessage)
  async createOrder(@Args('createorder') order: PlaceOrderInput) {
    console.log(order)
    return {
      status: 200,
      message: "order is waiting for approve"
    }
  }
}
