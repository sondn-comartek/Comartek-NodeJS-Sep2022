import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet, PetDocument } from './entities/pet.entity';
import { Model } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}
  async create(createPetInput: CreatePetInput) {
    try {
      const petInfo = { petID: uuidV4(), ...createPetInput };
      return await this.petModel.create(petInfo);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    const allPetsOfStore = await this.petModel.find();
    if (allPetsOfStore.length == 0) {
      return 'list pets of store is empty';
    }
    return allPetsOfStore;
  }

  async findByFields(id: string, tags: string[], status: string) {
    try {
      const pets = await this.petModel.find({
        $or: [{ petID: id }, { tags: tags }, { status: status }],
      });
      return pets;
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updatePetInput: UpdatePetInput) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
