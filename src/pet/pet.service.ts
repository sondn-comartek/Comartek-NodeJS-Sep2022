import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { UploadService } from 'src/upload/upload.service';
import { Model } from 'mongoose';
import { Pet } from 'src/shared/schemas';
import { CreatePetInput } from '../shared/inputs/create-pet.input';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    private readonly photoService: PhotoService,
    private readonly uploadService: UploadService,
  ) { }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    // check name, cate and tags
    return await this.petSchema.create(createPetInput);
  }
}
