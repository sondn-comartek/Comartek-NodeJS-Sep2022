import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, Quote, Shipment } from '../interface/quote.interface';
import { UpdateClientDto } from './dto/update-client.dto';
import { Rate, RateDocument} from '../schemas/rate.schema';
import { QuoteDocument } from '../schemas/quote.schema';
import configureMeasurements, { allMeasures, AllMeasuresUnits, Unit } from 'convert-units';
import { ShipmentDocument } from '../schemas/shipment.schema';
import  {generate}  from 'randomstring';
import { ObjectId } from 'mongodb';
import { DiscountDocument } from 'src/schemas/discount.schema';
const convert = configureMeasurements(allMeasures);



@Injectable()
export class ClientService {
  constructor(
    @InjectModel("rate") private rateModel: Model<RateDocument>,
    @InjectModel("quote") private quoteModel: Model<QuoteDocument>,
    @InjectModel("shipment") private shipmentModel: Model<ShipmentDocument>,
    @InjectModel("discount") private discountModel: Model<DiscountDocument>
    ) {}
  
  async getQuote(quoteId: string): Promise<QuoteDocument | null> {
    return await this.quoteModel.findOne({_id: new ObjectId(quoteId)})
  }

  randomString(numChar: number) {
    return generate(numChar)
  }
  async getDiscount() {
    return await this.discountModel.findOne().then(data => data.percent)
  }
  async getPrice(packageData: Package): Promise<number> {
    const amount:number = packageData.grossWeight.amount
    const unit:AllMeasuresUnits = packageData.grossWeight.unit as AllMeasuresUnits
    const gram:number = convert (amount).from(unit).to('g')
    const data: Rate[] = await this.rateModel.find({weight: {$gte: gram}})
    const totalRate: Rate[] = await this.rateModel.find({})
    const discount = await this.getDiscount()
    if(totalRate.length === data.length)
      return 12.43 - 12.43 * discount
    else if(data.length === 0) 
      return 100 - 100 * discount;
    else  {
      const normalPrice = data[data.length - 1].price as number
      return normalPrice - normalPrice * discount
    }
  }

  async storeQuote(quote: Quote) {
    const quoteObj = await new this.quoteModel(quote).save();
    return quoteObj
  }

  async storeShipment(shipment: Shipment) {
    const shipmentObj = await new this.shipmentModel({...shipment, status: 'Pending'}).save()
    return shipmentObj
  }

  async getShipment(ref:string): Promise<ShipmentDocument | null> {
    return await this.shipmentModel.findOne({ref: ref})
  }
  async deleteShipment(ref:string): Promise<any> {
     await this.shipmentModel.deleteOne({ref: ref})
     return true
  }
  async updateShipment(ref: string, pendingStatus: string) {
    const data = await this.shipmentModel.updateOne({ref: ref}, {$set: {status: pendingStatus}})
    return true
  }
  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
