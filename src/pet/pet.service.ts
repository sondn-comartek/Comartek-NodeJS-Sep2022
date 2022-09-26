import { PhotoResponseType } from './../shared/types/photo-response.type';
import { Photo } from './../shared/schemas/photo.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Pet, Tag } from 'src/shared/schemas';
import { CreatePetInput } from '../shared/inputs/create-pet.input';
import { PetResponseType } from '../shared/types/pet-response.type';
import { CategoryResponseType } from 'src/shared/types/category-response.type';
import { TagResponseType } from 'src/shared/types/tag-response.type';
import { Category } from '../shared/schemas/category.schema';
import { UpdatePetInput } from '../shared/inputs/update-pet.input';
import { CachingService } from '../caching/caching.service';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private readonly petSchema: Model<Pet>,
    @InjectModel(Category.name)
    private readonly categorySchema: Model<Category>,
    @InjectModel(Tag.name) private readonly tagSchema: Model<Tag>,
    @InjectModel(Photo.name) private readonly photoSchema: Model<Photo>,

    private readonly cachingService: CachingService,
  ) {}

  async findPetByName(name: string) {
    return await this.petSchema.findOne({ name });
  }

  async findAllPet(): Promise<PetResponseType[]> {
    const petsResponse: PetResponseType[] = [];
    const pets = await this.petSchema.find({});

    for (const pet of pets) {
      const category = await this.categorySchema.findById(pet.categoryId);
      const categoryResponse: CategoryResponseType = {
        _id: category._id.toString(),
        name: category.name,
      };

      const tags = await this.tagSchema.find({ _id: { $in: pet.tagsId } });
      const tagsResponse: TagResponseType[] = [];
      for (const tag of tags) {
        const tagResponse: TagResponseType = {
          _id: tag._id.toString(),
          name: tag.name,
        };
        tagsResponse.push(tagResponse);
      }

      const photo = await this.photoSchema.findById(pet.photosId);
      const photoResponse: PhotoResponseType = {
        _id: photo._id.toString(),
        url: photo.url,
      };

      const petResponse: PetResponseType = {
        _id: pet._id.toString(),
        ...pet.toObject(),
        category: categoryResponse,
        tags: tagsResponse,
        photos: photoResponse,
      };

      petsResponse.push(petResponse);
    }

    return petsResponse;
  }

  async findPetById(id: string): Promise<PetResponseType> {
    const cachedPet = await this.cachingService.getValueByKey(id);
    if (cachedPet) {
      return JSON.parse(cachedPet);
    }

    const pet = await this.petSchema.findById(id);
    if (!pet) {
      throw new NotFoundException('Pet không tồn tại');
    }

    const category = await this.categorySchema.findById(pet.categoryId);
    const categoryResponse: CategoryResponseType = {
      _id: category._id.toString(),
      name: category.name,
    };

    const tags = await this.tagSchema.find({ _id: { $in: pet.tagsId } });
    const tagsResponse = tags.map(function (tag): TagResponseType {
      return {
        _id: tag._id.toString(),
        name: tag.name,
      };
    });

    const petResponse: PetResponseType = {
      _id: pet._id.toString(),
      ...pet.toObject(),
      category: categoryResponse,
      tags: tagsResponse,
    };

    await this.cachingService.setValue(id, JSON.stringify(petResponse));

    return petResponse;
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

    const categoryRespone: CategoryResponseType = {
      _id: category._id.toString(),
      name: category.name,
    };

    const tagsResponse = tags.map(function (tag): TagResponseType {
      return { _id: tag._id.toString(), name: tag.name };
    });

    return {
      _id: pet._id.toString(),
      ...pet.toObject(),
      category: categoryRespone,
      tags: tagsResponse,
    };
  }

  async updatePetById(id: string, updatePetInput: UpdatePetInput) {
    const pet = await this.petSchema.findById(id);
    if (!pet) {
      throw new NotFoundException('PET NOT FOUND TO UPDATE');
    }

    if (updatePetInput?.categoryId) {
      if (!(await this.categorySchema.findById(updatePetInput?.categoryId))) {
        throw new NotFoundException('CATEGORY NOT FOUND');
      }
    }

    if (updatePetInput?.tagsId) {
      if (
        (await this.tagSchema.find({ id: { $in: updatePetInput?.tagsId } }))
          .length === 0
      ) {
        throw new NotFoundException('TAG NOT FOUND');
      }
    }

    await this.petSchema.findByIdAndUpdate(id, { $set: updatePetInput });

    return 'UPDATE PET SUCCESS';
  }

  async deletePetById(id: string) {
    if (!(await this.petSchema.findById(id))) {
      throw new NotFoundException('PET NOT FOUND TO DELETE');
    }

    await this.petSchema.findByIdAndRemove(id);

    return 'DELETE PET SUCCESS';
  }

  async findPetByStatus(status: string) {
    const pets = await this.petSchema.find({ status });
    if (pets.length === 0) {
      throw new NotFoundException('Pets not found');
    }

    const petsResponse: PetResponseType[] = [];

    for (const pet of pets) {
      const photos = await this.photoSchema.findById(pet.photosId);
      const photoResponse: PhotoResponseType = {
        _id: photos._id.toString(),
        url: photos.url,
      };
      const petResponse: PetResponseType = {
        _id: pet._id.toString(),
        name: pet.name,
        price: pet.price,
        photos: photoResponse,
      };
      petsResponse.push(petResponse);
    }

    return petsResponse;
  }

  async findPetByTagIds(ids: string[]): Promise<PetResponseType> {
    const tags = await this.tagSchema.find({ _id: { $in: ids } });
    if (tags.length === 0) {
      throw new NotFoundException('Tags not found');
    }

    return;
  }
}
