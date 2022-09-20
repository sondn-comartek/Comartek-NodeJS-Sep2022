import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EnityRepository } from "src/database";
import { Shipment } from "../interfaces";

@Injectable()
export class ShipmentRepository extends EnityRepository<Shipment>{
    constructor( @InjectModel('Shipment') ShipmentModel: Model<Shipment>){
        super(ShipmentModel)
    }
}