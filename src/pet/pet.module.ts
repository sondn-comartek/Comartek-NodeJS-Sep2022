import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from '../shared/schemas/pet.schema';
import { PhotoModule } from '../photo/photo.module';
import { UploadModule } from '../upload/upload.module';
import { CategoryModule } from 'src/category/category.module';
import { TagModule } from '../tag/tag.module';
import { Category, CategorySchema } from '../shared/schemas/category.schema';
import { Tag, TagSchema } from 'src/shared/schemas';

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
    PhotoModule,
    UploadModule,
    CategoryModule,
    TagModule,
  ],
  providers: [PetService, PetResolver],
})
export class PetModule {}
