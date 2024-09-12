import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CategoryService } from "src/modules/category/category.service";
import { Book } from "./model/book.model";
import { Types } from "mongoose";
import { FileUploadService } from "../fileupload/fileupload.service";
import { Workbook } from "exceljs";
import { readFileSync } from "fs";

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Book') private readonly bookModel: Model<Book>,
        private fileUploadService: FileUploadService,
        private categoryService: CategoryService
    ) { }
    async createBook(name: string, categoryId: string, quanities: number, pages: number) {
        const book = await this.bookModel.create({
            name,
            Category: new Types.ObjectId(categoryId),
            quanities,
            pages
        })
        return await book.save()
    }

    async findBookById(id: string) {
        return await this.bookModel.findOne({ _id: id })
    }

    async findBookByCond(name: string) {
        const book = await this.bookModel.findOne({ name })
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

    private styleSheet(sheet, rows) {
        // set the width of each column

        // set the height of header
        sheet.getRow(1).height = 30.5


        // font color 
        sheet.getRow(1).font = { size: 11.5, bold: true, color: { argb: 'FFFFFF' } }
        // background color 
        sheet.getRow(1).fill = { type: 'pattern', pattern: "solid", bgColor: { argb: 'ffd966' }, fgColor: { argb: 'ffd966' } }
        // alignments
        sheet.getRow(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true }
        // borders
        sheet.getRow(1).border = {
            top: { style: 'thin', color: { argb: 'ffd966' } },
            left: { style: 'thin', color: { argb: 'FFFFFF' } },
            bottom: { style: 'thin', color: { argb: 'ffd966' } },
            right: { style: 'thin', color: { argb: 'FFFFFF' } }
        }
    }

    async exportExcel(userId: string) {
        const listbooks = await this.bookModel.find()
        const listCategory = await this.categoryService.findCategoryByIDs(listbooks.map((book) => book.Category.toString()))
        let rows = listbooks.map((book) => {
            let category
            if (typeof book.Category !== 'string') {
                category = listCategory.find((category) => category.id === book.Category.toString())
            }

            else category = listCategory.find((category) => category.id === book.Category)
            const row = [book.id, book.name, book.quanities, book.pages, category.name]
            return row
        })

        let book = new Workbook()
        let sheet = book.addWorksheet('sheet')
        const sheet_name = ['ID', 'Book', 'Quanities', 'Pages', 'Category']
        rows.unshift(sheet_name)
        sheet.addRows(rows)
        this.styleSheet(sheet, rows)
        const path = `./src/modules/book/excel/ExportBooksExcel.xlsx`
        await book.xlsx.writeFile(path).then(_ => {

        })

        return true
    }

    returnExcelPath(userId: string) {
        return {
            userId,
            path: `./src/modules/book/excel/ExportBooksExcel.xlsx`
        }
    }


}

