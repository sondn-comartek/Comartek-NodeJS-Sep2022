import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from 'src/schema/pet.schema';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';

@Injectable()
export class StoreService {
  constructor(@InjectModel('pet') private petModel: Model<Pet>){}

  async findByStatus(status: string) {
    return this.petModel.find({status: status})
  }
 
}
