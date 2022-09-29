import { BadRequestException, Injectable } from '@nestjs/common';
import { genCode } from 'src/ultils';
import { v4 } from 'uuid';
import { CategoryRepository } from '../category/category.repository';
import { BookRepository } from './book.repository';
import { CreateBookInput } from './dto';
import { GetListArg } from './dto/get-list.arg';
import { BookDocument } from './models';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository ,
        private readonly categoryRepository: CategoryRepository
        ) { }
    async create(createBookInput: CreateBookInput): Promise<BookDocument> {
        const { name , part , categories } = createBookInput
        const listCategory = await Promise.all(
            categories.map( categoryCode => this.categoryRepository.FindOne({
                code : categoryCode
            }, 'name code' , { lean : true }))
        )
        listCategory.forEach( category => {
            if(!category) throw new BadRequestException('the category is undefined!')
        })
        return await this.bookRepository.Create({
            bookid: v4(),
            code: genCode(`${name} ${part}`),
            ...createBookInput
        });
    }
    async findBooks({status , page}: GetListArg | any): Promise<BookDocument[]> {
        if(!status && !page) return await this.bookRepository.FindAll( 
            {} ,'-_id', 
            { lean: true  })
        if(!status && page ) return await this.bookRepository.FindAll( 
            {} , '-_id', 
            { lean: true  , skip : 2 * ( page - 1 ) , limit : 2 })
        if(status && !page) return await this.bookRepository.FindAll(
            { status: status  }, '-_id', 
            { lean: true  })
        if(status && page) return await this.bookRepository.FindAll(
            { status: status  }, '-_id', 
            { lean: true  , skip : 2 * ( page - 1 ) , limit : 2 })
    }
}
