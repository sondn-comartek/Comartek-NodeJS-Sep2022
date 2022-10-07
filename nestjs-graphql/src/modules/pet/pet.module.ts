import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './models';
import { PetRepository } from './pet.repository';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : Pet.name ,
        schema : PetSchema
      }
    ])
  ] ,
  providers: [PetResolver, PetService , PetRepository] ,
  exports: [PetRepository , MongooseModule]
})
export class PetModule {}
