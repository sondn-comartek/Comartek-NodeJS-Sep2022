import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookNotExist } from 'src/exception/booknotexist';
import { BookDocument } from 'src/schema/book.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
 constructor(@InjectModel('book') private bookModel: Model<BookDocument>) {
 }
 public async borrowBook(userid: String, bookID: string) {
      const book =  await this.bookModel.findOne({_id: bookID});
      if(!book) {
        throw new BookNotExist();
      }
      await this.bookModel.updateOne({_id: bookID}, {$set: {borrowed: true, userborrow: userid}})
}
}
