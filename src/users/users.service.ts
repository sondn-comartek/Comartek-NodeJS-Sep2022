import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';
import { UserDocument } from 'src/schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument> ) {}

  async findUser(username: string) : Promise < UserDocument | undefined> {
    return await this.userModel.findOne({username: username})
  }

  async createUser(username: string, password: string, role: string = 'customer') : Promise<any> {
    return await new this.userModel({username: username, password: password, role: role}).save()
  }

}
