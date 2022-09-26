import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import internal, { Stream } from 'stream';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/pet.input';
import { join, resolve } from 'path';
import { createWriteStream } from 'fs';
import { v4} from 'uuid'
import { Pet, PetDocument } from 'src/schema/pet.schema';
import { CreateNewPetInput } from './dto/pet.input';
import { PetProperties } from './enum/petproperties';
@Injectable()
export class PetService {
  constructor(@InjectModel('pet') private petModel: Model<Pet>) {
  }
  async createNewPet(petData: CreateNewPetInput): Promise<PetDocument> {
    const newPet = await new this.petModel({...petData}).save()
    return newPet
  }
  async updatePet(petData: UpdatePetInput): Promise<any> {
    
    let pet = await this.petModel.findOne({_id: petData.id})
    PetProperties.forEach(element => {
      if(element !== 'photoids') {
        if(!petData[element])
          petData[element] = pet[element]
      } 
    });
    await this.petModel.updateOne({_id: petData.id}, {$set: {...petData}})
    return petData
  }
  async detePet(id: string): Promise<any> {
    await this.petModel.findOneAndDelete({_id: id})
    return
  }
  async handdleFileStream(filestream: internal.Stream,filename:string, petid: string) {
    const filetype = filename.split(".").at(-1)
    const uuid = v4()
    await new Promise((res, rej) => {
     filestream
    .pipe(createWriteStream(join(process.cwd(), `./upload/pet-upload-image-${petid}-${uuid}.${filetype}`)))
    .on('finish',async () =>{
      await this.petModel.updateOne({id: petid} ,
         {$push: {photoids: `pet-upload-image-${petid}-${uuid}.${filetype}`}}
      )
      console.log(`update photo scuccess for pet ${petid}`)
      res("ok")
    }
    )
    .on('error',(err) => {
      console.log(err)
      throw new Error()
     })
    }
   );
  }
  async listAllPet() {
    return this.petModel.find({})
  }
  async findPet(findObject: Object) {
    return this.petModel.find({...findObject})
  }
  create(createPetInput: CreatePetInput) {
    return 'This action adds a new pet';
  }

  findAll() {
    return `This action returns all pet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetInput: UpdatePetInput) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
