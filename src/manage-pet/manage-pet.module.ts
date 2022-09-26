import { Module } from '@nestjs/common';
import { ManagePetService } from './manage-pet.service';
import { ManagePetResolver } from './manage-pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './entities/manage-pet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Pet', schema: PetSchema}])
  ],
  providers: [ManagePetResolver, ManagePetService],
  exports: [ManagePetResolver, ManagePetService]
})
export class ManagePetModule {}
