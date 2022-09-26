import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from 'src/schema/pet.schema';
import { Order, OrderDocument } from 'src/schema/order.schema';

@Injectable()
export class StoreService {
  constructor(@InjectModel('pet') private petModel: Model<Pet>,
  @InjectModel('order') private orderModel: Model<OrderDocument>){}

  async findByStatus(status: string) {
    return this.petModel.find({status: status})
  }
  
  async getTotalPrice(petIds: [string]) {
    let total = 0
    for(let i = 0; i < petIds.length; i++) {
      const pet = await this.petModel.findOne({_id: petIds[i]})
      total += pet?.price ? pet?.price : 0
    }
    return total
  }
  async storeOrder(petIds: [string], shippingDate: Date) {
    const price = await this.getTotalPrice(petIds)
    await new this.orderModel({petids: petIds, shippingDate: shippingDate}).save()
    return price
  }

  async changeOrderStatus(id, newStatus) {
    return await this.orderModel.updateOne({_id: id}, {orderStatus: newStatus})
    
  }

  async findPurchase(id) {
    return await this.orderModel.findOne({_id:id})
  }
  
  async deletePurchase(id) {
    const order = await this.orderModel.findOne({_id: id})
    if(order.orderStatus === "placed" )
      await this.orderModel.deleteOne({_id: id})
    else 
      throw new HttpException("can not delete this purchase",HttpStatus.BAD_REQUEST)
  }
}
