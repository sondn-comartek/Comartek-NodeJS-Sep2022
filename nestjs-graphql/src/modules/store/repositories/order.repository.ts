import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EnityRepository } from "src/entities";
import { Order, OrderDocument } from "../models";

export class OrderRepository extends EnityRepository<OrderDocument> {
    constructor(@InjectModel(Order.name) orderModel: Model<OrderDocument>){
        super(orderModel)
    }
}