import { Shipment, ShipmentSchema, ShipmentDocument } from './entities/shipment.entity';
import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ShipmentService {
  constructor(@InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>){}
  create(createShipmentDto: CreateShipmentDto) {
    const {id: quoteID, price } = createShipmentDto?.data?.quote
    let refString = this.genRandString(10)
    try {
      const shipmentMode = new this.shipmentModel({
      quote_id: quoteID,
      ref: refString,
      cost: price
    })
    const createdShipment = shipmentMode.save()  
    return createdShipment;
    } catch (error) {
      console.log(error);
      return "oop something wrong"
    }
  }
  genRandString (length){
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
   }
   return result;
  }
  findAll() {
    return `This action returns all shipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipment`;
  }

  update(id: number, updateShipmentDto: UpdateShipmentDto) {
    return `This action updates a #${id} shipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }
}
