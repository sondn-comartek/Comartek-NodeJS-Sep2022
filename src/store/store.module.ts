import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from 'src/schema/pet.schema';
import { OrderSchema } from 'src/schema/order.schema';
@Module({
  imports: [ MongooseModule.forFeature(
    [{
      name: 'pet', schema: PetSchema
    },
    {
      name: 'order', schema: OrderSchema
    }]
    )
  ],
  providers: [StoreResolver, StoreService]
})
export class StoreModule {}
