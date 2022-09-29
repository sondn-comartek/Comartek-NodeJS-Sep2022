import { Injectable } from '@nestjs/common';
import { genCode } from 'src/ultils/gen-code.ultil';
import { BookRepository } from '../book/book.repository';
import { BookDocument } from '../book/models';
import { CategoryRepository } from './category.repository';
import { CreateCategoryInput, GetListArg } from './dto';
import { CategoryDocument } from './models';

@Injectable()
export class CategoryService {
    constructor( 
      private readonly categoryRepositoy: CategoryRepository ,
      private readonly bookRepository: BookRepository
      ){}
    async create(createCategoryInput:CreateCategoryInput):Promise<CategoryDocument>{
      return await this.categoryRepositoy.Create({
        code : genCode(createCategoryInput.name) ,
        ...createCategoryInput
      })
    }

    async findBooks({ categoryCode , page }:GetListArg):Promise<BookDocument[]>{
      if(categoryCode && page) {
        return await this.bookRepository.FindAll({
          categories: categoryCode
        } , '-_id -_v' , { lean : true , skip : 2 * (page - 1) , limit: 2 })
      }
      return await this.bookRepository.FindAll({
        categories : categoryCode 
      } , '-_id -_v',  { lean : true } );
    }

}
