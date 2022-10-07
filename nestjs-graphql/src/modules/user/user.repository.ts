import { Injectable } from "@nestjs/common";
import { EnityRepository } from "src/entities";
import { User , UserDocument } from "./model";
import { Model } from "mongoose" ;
import { InjectModel } from '@nestjs/mongoose'

@Injectable() 
export class UserRepository extends EnityRepository<UserDocument>{
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument> ){
        super(userModel)
    }
}