import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { Pet, PetSchema } from './schemas/pet.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [PetsResolver, PetsService],
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
})
export class PetsModule {}
