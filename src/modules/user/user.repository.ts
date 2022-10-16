import { Injectable} from "@nestjs/common";
import { EnityRepository } from "src/abstract";
import { User, UserDocument } from "./models";
import { InjectModel } from "@nestjs/mongoose" ;
import { Model } from 'mongoose'

@Injectable()
export class UserRepository extends EnityRepository<UserDocument>{
    constructor(@InjectModel(User.name) userModel: Model<UserDocument>){
        super(userModel)
    }
}