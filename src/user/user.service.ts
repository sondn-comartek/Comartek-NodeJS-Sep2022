import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}
 

  async findAllUser() {
    return this.userModel.find({});
  }
  async deleteUser(id: string) {
    return this.userModel.deleteOne({_id: id})
  }
}
