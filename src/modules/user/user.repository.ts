import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EnityRepository } from "src/database";
import { User } from "./interfaces";

@Injectable()
export class UserRepository extends EnityRepository<User>{
    constructor(@InjectModel('User') UserModel: Model<User>){
        super(UserModel)
    }
}