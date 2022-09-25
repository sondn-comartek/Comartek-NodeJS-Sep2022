import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EnityRepository } from "src/entities";
import { Pet, PetDocument } from "./models";

@Injectable()
export class PetRepository extends EnityRepository<PetDocument> {
    constructor(@InjectModel(Pet.name) petModel: Model<PetDocument>){
        super(petModel)
    }
}