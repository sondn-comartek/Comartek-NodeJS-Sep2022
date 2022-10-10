import { Injectable} from "@nestjs/common";
import { EnityRepository } from "src/abstract";
import { Excel, ExcelDocument } from "./models";
import { InjectModel } from "@nestjs/mongoose" ;
import { Model } from 'mongoose'

@Injectable()
export class ExcelRepository extends EnityRepository<ExcelDocument>{
    constructor(@InjectModel(Excel.name) excelModel: Model<ExcelDocument>){
        super(excelModel)
    }
}