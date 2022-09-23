import { InjectModel } from '@nestjs/mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PhotoService } from 'src/photo/photo.service';
import { UploadService } from 'src/upload/upload.service';
import { Model } from 'mongoose';
import { Pet, Tag } from 'src/shared/schemas';
import { CreatePetInput } from '../shared/inputs/create-pet.input';
import { CategoryService } from 'src/category/category.service';
import { TagService } from '../tag/tag.service';
import { PetResponseType } from '../shared/types/pet-response.type';
import { CategoryResponseType } from 'src/shared/types/category-response.type';
import { TagResponseType } from 'src/shared/types/tag-response.type';
import { Category } from '../shared/schemas/category.schema';
import { UpdatePetInput } from '../shared/inputs/update-pet.input';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    @InjectModel(Category.name)
    private readonly categorySchema: Model<Category>,
    @InjectModel(Tag.name) private readonly tagSchema: Model<Tag>,

    private readonly photoService: PhotoService,
    private readonly uploadService: UploadService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async findPetByName(name: string) {
    return await this.petSchema.findOne({ name });
  }

  async findAllPet() {
    const pets = await this.petSchema.find({});

    const petsResponse = pets.map(async (pet) => {
      const categoryId = pet.categoryId;
      const category = await this.categorySchema.findById(categoryId);
      const categoryResponse = new CategoryResponseType(
        category._id.toHexString(),
        category.name,
      );

      const tagsId = pet.tagsId;
      const tags = await this.tagSchema.find({ _id: { $in: tagsId } });
      const tagsResponse = [];
      tags.forEach(async (tag) => {
        const tagResponse = new TagResponseType(tag._id.toString(), tag.name);
        tagsResponse.push(tagResponse);
      });

      return new PetResponseType(
        pet._id.toString(),
        pet.name,
        pet.price,
        categoryResponse,
        tagsResponse,
        [],
        pet.status,
      );
    });

    return petsResponse;
  }

  async findPetById(id: string): Promise<PetResponseType> {
    const pet = await this.petSchema.findById(id);
    if (!pet) {
      throw new NotFoundException('Pet không tồn tại');
    }

    const category = await this.categorySchema.findById(pet.categoryId);
    const categoryResponse = new CategoryResponseType(
      category._id.toString(),
      category.name,
    );

    const tags = await this.tagSchema.find({ _id: { $in: pet.tagsId } });
    const tagsResponse = tags.map((tag) => {
      return new TagResponseType(tag._id.toString(), tag.name);
    });

    return new PetResponseType(
      pet._id.toString(),
      pet.name,
      pet.price,
      categoryResponse,
      tagsResponse,
      [],
      pet.status,
    );
  }

  async createPet(createPetInput: CreatePetInput): Promise<PetResponseType> {
    const { name, categoryId, tagsId } = createPetInput;

    if (await this.findPetByName(name)) {
      throw new ConflictException(`Pet "${name}" đã tồn tại`);
    }

    const category = await this.categorySchema.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Category không tồn tại');
    }

    const tags = await this.tagSchema.find({ _id: { $in: tagsId } });
    if (tags.length === 0) {
      throw new NotFoundException('Tags không tồn tại');
    }

    const pet = await this.petSchema.create(createPetInput);
    const categoryRespone = new CategoryResponseType(
      category._id.toString(),
      category.name,
    );
    const tagsResponse = tags.map((tag) => {
      return new TagResponseType(tag._id.toString(), tag.name);
    });

    return new PetResponseType(
      pet._id.toString(),
      name,
      pet.price,
      categoryRespone,
      tagsResponse,
      [],
      pet.status,
    );
  }

  async updatePetById(id: string, updatePetInput: UpdatePetInput) {
    const pet = await this.petSchema.findById(id);
    if (!pet) {
      throw new NotFoundException('PET NOT FOUND');
    }

    if (updatePetInput?.categoryId) {
      if (
        !(await this.categoryService.findCategoryById(
          updatePetInput?.categoryId,
        ))
      ) {
        throw new NotFoundException('Category NOT FOUND');
      }
    }

    if (updatePetInput?.tagsId) {
      if (
        (await (
          await this.tagSchema.find({ id: { $in: updatePetInput?.tagsId } })
        ).length) === 0
      ) {
        throw new NotFoundException('TAG NOT FOUND');
      }
    }

    await this.petSchema.findByIdAndUpdate(id, { $set: updatePetInput });

    return 'UPDATED';
  }

  async deletePetById(id: string) {
    await this.petSchema.findByIdAndRemove(id);
    return 'deleted';
  }
}
