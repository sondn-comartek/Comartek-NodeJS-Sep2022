import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from '../shared/schemas/pet.schema';
import { PhotoModule } from '../photo/photo.module';
import { UploadModule } from '../upload/upload.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pet.name,
        schema: PetSchema,
      },
    ]),
    PhotoModule,
    UploadModule,
    CategoryModule,
  ],
  providers: [PetService, PetResolver],
})
export class PetModule {}
