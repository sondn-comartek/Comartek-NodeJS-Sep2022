// import { Pet } from 'src/shared/schemas';
import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Timeout } from '@nestjs/schedule';
// import { Model } from 'mongoose';

@Injectable()
export class TaskSchedulingService {
  // constructor(@InjectModel(Pet.name) private readonly petSchema: Model<Pet>) { }
  // @Timeout(10000)
  // async updatePetPhoto() {
  //     const pets = await this.petSchema.updateMany({}, { $set: { photosId: "63312210850172461aead078" } }, { new: true })
  //     console.log({ pets })
  // }
}
