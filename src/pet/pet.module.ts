import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from '../shared/schemas/pet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Pet.name, schema: PetSchema
    }])
  ],
  providers: [PetService, PetResolver],
})
export class PetModule { }
