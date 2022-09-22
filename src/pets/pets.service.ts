import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet, PetDocument } from './schemas/pet.schema';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name)
    private readonly petModel: Model<PetDocument>,
  ) {}

  async create(createPetInput: CreatePetInput) {
    try {
      return await new this.petModel({
        ...createPetInput,
      }).save();
    } catch (e) {
      throw e;
    }
  }

  async petInventory() {
    const pets = await this.petModel.find();
    const petAvailable = await this.petModel.find({ status: 'available' });

    const result = { pets, available: petAvailable.length };
    return result;
  }

  async findAll() {
    return await this.petModel.find();
  }

  async findById(id: string) {
    return await this.petModel.findOne({ id });
  }

  async findByTags(tags: string) {
    return await this.petModel.findOne({ tags });
  }

  async findPetByStatus(status: string) {
    return await this.petModel.findOne({ status });
  }

  async update(id: string, updatePetInput: UpdatePetInput) {
    try {
      return await this.petModel.findOneAndUpdate(
        { id },
        { $set: { ...updatePetInput } },
        {
          new: true,
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async remove(id: string) {
    try {
      const petExist = await this.petModel.findOne({ id });
      if (!petExist) {
        return null;
      }

      return await this.petModel.deleteOne({ id });
    } catch (e) {
      throw e;
    }
  }
}
