import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { UploadService } from 'src/upload/upload.service';
import { Model } from 'mongoose';
import { Pet } from 'src/shared/schemas';
import { CreatePetInput } from '../shared/inputs/create-pet.input';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    private readonly photoService: PhotoService,
    private readonly uploadService: UploadService,
    private readonly categoryService: CategoryService,
  ) {}

  async findPetByName(name: string) {
    return await this.petSchema.findOne({ name });
  }

  // async findPetBy(id: string): Promise<Pet> {
  //   return await (await this.petSchema.findOne({ id })).populated('category');
  // }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const { name } = createPetInput;
    const categoryInput = createPetInput.category;

    if (await this.findPetByName(name)) {
      throw new ConflictException(`Pet "${name}" đã tồn tại`);
    }

    let category = await this.categoryService.findCategoryByName(categoryInput);
    if (!category) {
      category = await this.categoryService.createCategory({
        name: categoryInput,
      });
    }

    return await this.petSchema.create({
      ...createPetInput,
      category: category.id,
    });
  }
}
