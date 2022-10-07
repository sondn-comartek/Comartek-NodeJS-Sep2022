import { Injectable } from '@nestjs/common'
import { EnityRepository } from 'src/abstract'
import { Order, OrderDocument } from './models'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class OrderRepository extends EnityRepository<OrderDocument> {
   constructor(@InjectModel(Order.name) orderModel: Model<OrderDocument>) {
      super(orderModel)
   }
}
