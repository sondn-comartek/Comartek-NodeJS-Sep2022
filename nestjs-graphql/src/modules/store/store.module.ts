import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './models';
import { OrderRepository } from './repositories';
import { PetRepository } from '../pet/pet.repository';
import { PetModule } from '../pet/pet.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : Order.name ,
        schema : OrderSchema
      }
    ]) ,
    PetModule
  ] ,
  providers: [StoreResolver, StoreService , OrderRepository , PetRepository]
})
export class StoreModule {}
