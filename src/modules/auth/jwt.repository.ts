import { Injectable} from "@nestjs/common";
import { EnityRepository } from "src/abstract-entites";
import { Token, TokenDocument } from "./models";
import { InjectModel } from "@nestjs/mongoose" ;
import { Model } from 'mongoose'

@Injectable()
export class TokenRepository extends EnityRepository<TokenDocument>{
    constructor(@InjectModel(Token.name) tokenModel: Model<TokenDocument>){
        super(tokenModel)
    }
}