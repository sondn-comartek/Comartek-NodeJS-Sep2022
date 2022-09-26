import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { GetQueryByStatusRes } from 'src/manage-store/entities/query-pet-by-status.response';
import { CreateManagePetInput } from './dto/create-manage-pet.input';
import { SearchManagePetInput } from './dto/search-manage-pet.input';
import { UpdateManagePetInput } from './dto/update-manage-pet.input';
import { UploadPetImageInput } from './dto/upload-pet-image.input';
import { ManagePet } from './entities/manage-pet.entity';

@Injectable()
export class ManagePetService {
  constructor(
    @InjectModel('Pet') private readonly managePet: Model<ManagePet>,
  ) { }
  async create(createManagePetInput: CreateManagePetInput): Promise<ManagePet> {
    const existedPet = await this.managePet.findOne({ name: createManagePetInput.name });
    if (existedPet) {
      throw new Error(`Pet with name ${createManagePetInput.name} is existed`);
    }

    // Generate petId
    const petId = Math.floor(Math.random() * 1000000 + 1000000);

    // Take photo_url
    const image = createManagePetInput.image;
    const { createReadStream, filename } = await image;
    await createReadStream().pipe(
      createWriteStream(join(process.cwd(), `./src/upload/${filename}`)))
      .on('finish', () => {
        return filename;
      })
      .on('error', () => {
        new Error('Could not save image');
      });
    let newPet = {
      petId: petId,
      ...createManagePetInput
    }
    delete newPet.image;
    newPet['photoUrl'] = [join(process.cwd(), `./src/upload/${filename}`)];

    const createdPet = await this.managePet.create(newPet);
    if (createdPet) {
      return createdPet;
    }
    throw new Error('Can not create a new pet');
  }

  async findAll() {
    const petList = await this.managePet.find();
    if (!petList) {
      throw new Error("Can not get all pet in pet's store");
    }
    return petList;
  }

  async findPet(searchManagePetInput: SearchManagePetInput) {
    const { petId, tag, status } = searchManagePetInput.where;
    if (!petId && !tag && !status) {
      throw new Error('ID or tag or status is required for get a pet');
    }
    let queryObject: Record<any, any> = {}
    if (petId) {
      queryObject.petId = petId;
    }
    if (tag) {
      queryObject.tag = tag;
    }
    if (status) {
      queryObject.status = status;
    }
    const pet = await this.managePet.find(queryObject);
    return pet;
  }

  async findPetByStatus(status: string): Promise<GetQueryByStatusRes> {
    const petList = await this.managePet.find({ status: status });
    if (!petList) {
      throw new Error(`All pets with status ${status} not found`);
    }
    return {
      petList: JSON.parse(JSON.stringify(petList)),
      totalPet: petList.length
    };
  }

  async update(id: number, updateManagePetInput: UpdateManagePetInput): Promise<ManagePet> {
    const pet = await this.managePet.findOne({ petId: id });
    if (!pet) {
      throw new Error(`Pet with id ${id} not found`);
    }
    if (updateManagePetInput.category) {
      pet.category = updateManagePetInput.category;
    }
    if (updateManagePetInput.name) {
      pet.name = updateManagePetInput.name;
    }
    if (updateManagePetInput.tag) {
      pet.tag = updateManagePetInput.tag;
    }
    if (updateManagePetInput.status) {
      pet.status = updateManagePetInput.status;
    }

    await pet.save();
    return pet;
  }

  async remove(id: number) {
    const deletedPet = await this.managePet.findOneAndDelete({ petId: id });
    return deletedPet;
  }

  async uploadImage(uploadPetImageInput: UploadPetImageInput): Promise<ManagePet> {
    const { petId, image } = uploadPetImageInput;
    const pet = await this.managePet.findOne({ petId: petId });
    if (!pet) {
      throw new Error(`Pet with id ${petId} not found`);
    }
    const { createReadStream, filename } = await image;
    await createReadStream()
      .pipe(createWriteStream(join(process.cwd(), `./src/upload/${filename}`)))
      .on('finish', () => {
        return filename;
      }
      )
      .on('error', () => {
        new Error('Could not save image');
      });
    
    pet.photoUrl.push(join(process.cwd(), `./src/upload/${filename}`));
    await pet.save();
    return pet;
  }
}
