import { Injectable} from "@nestjs/common";
import { EnityRepository } from "src/abstract";
import { Book, BookDocument } from "./models";
import { InjectModel } from "@nestjs/mongoose" ;
import { Model } from 'mongoose'

@Injectable()
export class BookRepository extends EnityRepository<BookDocument>{
    constructor(@InjectModel(Book.name) bookModel: Model<BookDocument>){
        super(bookModel)
    }
}