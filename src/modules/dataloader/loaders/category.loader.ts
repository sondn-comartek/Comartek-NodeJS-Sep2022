import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader'
import { Category , CategoryDocument } from 'src/modules/category/models';
import { NestDataLoader } from 'nestjs-dataloader';
import { maping } from '../helpers';
import { CategoryService } from 'src/modules/category/category.service';

@Injectable()
export class CategoryLoader implements NestDataLoader< string , CategoryDocument >{
    constructor(
        private readonly categoryService:CategoryService ){}
    generateDataLoader():DataLoader<string , CategoryDocument >{
        return new DataLoader( async ( codes: string[] ) => {
            const categories = await this.categoryService.findCategoriesByCodes(codes)
            return maping<CategoryDocument>('code' , codes , categories)
        })
    }
}