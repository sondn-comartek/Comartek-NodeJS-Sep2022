import { Injectable} from "@nestjs/common";
import { EnityRepository } from "src/abstract-entites";
import { Category, CategoryDocument } from "./models";
import { InjectModel } from "@nestjs/mongoose" ;
import { Model } from 'mongoose'

@Injectable()
export class CategoryRepository extends EnityRepository<CategoryDocument>{
    constructor(@InjectModel(Category.name) categoryModel: Model<CategoryDocument>){
        super(categoryModel)
    }
}