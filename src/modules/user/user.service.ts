import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './model/user.schema';

@Injectable()
export class UserService {
 constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}



 public getUserModel() {
  return this.userModel;
 }

 
}
