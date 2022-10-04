import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookNotExist } from '../exception/booknotexist';
import { UserService } from '../user/user.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { BookDocument } from './model/book.schema';

@Injectable()
export class BookService {
  constructor (@InjectModel('book') private bookModel: Model<BookDocument>) {}

  public async borrowBook(userid: String, bookID: string) {
    const book =  await this.bookModel.findOne({_id: bookID});
    if(!book) {
      throw new BookNotExist();
    }
    await this.bookModel.updateOne({_id: bookID}, {$set: {borrowed: true, userborrow: userid}})
  }

  async getBookModel() {
    return this.bookModel;
  }

  
}
