import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookNotExist } from 'src/modules/exception/booknotexist';
import { BookDocument } from 'src/modules/schema/book.schema';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
 constructor( @InjectModel('book') private bookModel: Model<BookDocument>,
              @InjectModel('user') private userModel: Model<UserDocument>) {}
 public async borrowBook(userid: String, bookID: string) {
      const book =  await this.bookModel.findOne({_id: bookID});
      if(!book) {
        throw new BookNotExist();
      }
      await this.bookModel.updateOne({_id: bookID}, {$set: {borrowed: true, userborrow: userid}})
 }


 public getUserModel() {
  return this.userModel;
 }

 
}
