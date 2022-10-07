import { Injectable} from "@nestjs/common";
import { EnityRepository } from "src/abstract";
import { Image, ImageDocument } from "./models";
import { InjectModel } from "@nestjs/mongoose" ;
import { Model } from 'mongoose'

@Injectable()
export class ImageRepository extends EnityRepository<ImageDocument>{
    constructor(@InjectModel(Image.name) imageModel: Model<ImageDocument>){
        super(imageModel)
    }
}