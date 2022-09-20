import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EnityRepository } from "src/database";
import { Quote } from "../interfaces";

@Injectable()
export class QuoteRepository extends EnityRepository<Quote> {
    constructor(@InjectModel('Quote') QuoteModel: Model<Quote>) {
        super(QuoteModel)
    }
}