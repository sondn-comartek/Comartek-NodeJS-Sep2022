import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from '../shared/schemas/pet.schema';
import { UploadModule } from '../upload/upload.module';
import { Category, CategorySchema } from '../shared/schemas/category.schema';
import { Tag, TagSchema } from 'src/shared/schemas';
import { CachingModule } from '../caching/caching.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pet.name,
        schema: PetSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
    UploadModule,
    CachingModule,
  ],
  providers: [PetService, PetResolver],
})
export class PetModule {}
