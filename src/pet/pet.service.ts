import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { UploadService } from 'src/upload/upload.service';
import { Model } from 'mongoose';
import { Pet } from 'src/shared/schemas';
import { CreatePetInput } from '../shared/inputs/create-pet.input';
import { CategoryService } from 'src/category/category.service';
import { TagService } from '../tag/tag.service';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    private readonly photoService: PhotoService,
    private readonly uploadService: UploadService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService
  ) { }

  async findPetByName(name: string) {
    return await this.petSchema.findOne({ name });
  }

  async findAllPet(): Promise<Pet[]> {
    return await this.petSchema.find()
  }

  // async findPetBy(id: string): Promise<Pet> {
  //   return await (await this.petSchema.findOne({ id })).populated('category');
  // }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const { name, categoryId, tagsId } = createPetInput;

    if (await this.findPetByName(name)) {
      throw new ConflictException(`Pet "${name}" đã tồn tại`);
    }

    const category = await this.categoryService.findCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException("Category không tồn tại")
    }

    const tags = await this.tagService.findTagByArrayId(tagsId);
    if (tags.length === 0) {
      throw new NotFoundException("Tags không tồn tại")
    }

    return await this.petSchema.create({
      ...createPetInput,
      category,
      tags
    });
  }
}