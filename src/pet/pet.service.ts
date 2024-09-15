import { PetStatus } from 'src/enums/pet.status';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet, PetDocument } from './entities/pet.entity';
import { Model } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { createWriteStream } from 'fs';
import { join } from 'path';
@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}
  async create(createPetInput: CreatePetInput) {
    const { createReadStream, filename } = await createPetInput.image;
    const filename_petAvatar = await createReadStream().pipe(
      createWriteStream(join(process.cwd(), `./public/images/${filename}`))
        .on('finish', () => {
          return filename;
        })
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        }),
    );
    try {
      let petInfo = { petID: uuidV4(), ...createPetInput };
      delete petInfo.image
      petInfo['photo_urls'] = filename
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
  async findPetsCustomerOrderByIds(pets: object | [string]) {
    const petsOfOrder = await this.petModel.find({ petID: pets });
    return petsOfOrder;
  }
  async findByFields(id: string, tags: string[], status: PetStatus) {
    try {
      const pets = await this.petModel.find({
        $or: [{ petID: id }, { tags: tags }, { status: status }],
      });
      return pets;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAmountPetByStatus(status: PetStatus) {
    try {
      return await this.petModel.count({ status: status });
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
