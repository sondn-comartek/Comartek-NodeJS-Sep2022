import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EnityRepository } from "src/database";
import { Rate } from "../interfaces";

@Injectable()
export class RateRepository extends EnityRepository<Rate> {
    constructor( @InjectModel('Rate') RateModel: Model<Rate>){
        super(RateModel)
    }
}