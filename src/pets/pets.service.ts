import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
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
      const { image } = createPetInput;
      const { createReadStream, filename } = await image;

      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
        )
        .on('finish', async () => {
          return true;
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });

      return await new this.petModel({
        ...createPetInput,
        image: filename,
      }).save();
    } catch (e) {
      throw e;
    }
  }

  async petInventory() {
    try {
      const pets = await this.petModel.find();
      const petAvailable = await this.petModel.find({ status: 'available' });
      const available = petAvailable.length;

      const result = {
        pets,
        available,
      };
      return result;
    } catch (e) {
      throw e;
    }
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
