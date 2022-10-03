import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CategoryService } from "src/modules/category/category.service";
import { Book } from "./model/book.model";
import { Types } from "mongoose";

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Book') private readonly bookModel: Model<Book>
    ) { }
    async createBook(name: string, categoryId: string, quanities: number, pages: number) {
        const book = await this.bookModel.create({
            name,
            Category: new Types.ObjectId(categoryId),
            quanities,
            pages
        })
        book.populate('Category')
        return await book.save()
    }

    async findBookById(id: string) {
        return await this.bookModel.findOne({ _id: id })
    }

    async findBookByCond(name: string) {
        const book = await this.bookModel.findOne({ name }).populate('Category')
        return book
    }

    async findBooks(page: number) {
        let listBooks = await this.bookModel.find().skip(5 * (page - 1)).limit(5)

        return listBooks
    }

    async findBooksByIds(ids: readonly string[]) {

        const books = await this.bookModel.find({ _id: { $in: ids } })
        const mappedBooks = ids.map(
            (id) =>
                books.find((book) => book.id === id) ||
                new Error(`Could not load book ${id}`),
        );
        // console.log('mappedUsers', mappedUsers);
        return mappedBooks
    }


}

