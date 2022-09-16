import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Quote } from '../shipment/interfaces/quote.interface'
import { Rate } from '../shipment/interfaces/rate.interface'
import { Shipment } from './interfaces/shipment.interface';
import { DataQuote } from './dto/get-quote.dto';
import { GetShipmentDto } from './dto/get-shipment.dto'
import { CreateShipmentDto } from './dto/create-shipment.dto';;
import RandomTenNumber from 'src/ultils/gen-random-number.ultil';
import * as Convert from 'convert-units';
import { DeteleShipmentDto } from './dto/delete-shipment.dto';


@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel('Rate')
    private readonly RateModel: Model<Rate>,
    @InjectModel('Quote')
    private readonly QuoteModel: Model<Quote>,
    @InjectModel('Shipment')
    private readonly ShipmentModel: Model<Shipment>,
  ) { }

  async StoreQuote(amount: number): Promise<Quote> {
    const NewQuote = new this.QuoteModel({
      amount: amount
    })
    delete NewQuote.__v
    await NewQuote.save()
    return NewQuote;
  }

  async StoreShipment(ShipmentData: CreateShipmentDto, Cost: number): Promise<Shipment> {
    const NewShipment = new this.ShipmentModel({
      ref: RandomTenNumber(),
      cost: Cost,
      create_at: new Date(),
      ...ShipmentData,
    })
    await NewShipment.save()
    return NewShipment;
  }

  async GetQuote(DataQuote: DataQuote): Promise<Quote> {
    const Amount = DataQuote.package?.grossWeight?.amount;
    const Unit = DataQuote.package?.grossWeight?.unit;
    const WeightByGam: number = Convert(Amount).from(Unit).to('g');
    const Rates = await this.RateModel
      .find({
        weight: { $lte: WeightByGam } })
      .lean()
      .sort( { price : 1 })
    if (Rates.length === 0) return await this.StoreQuote(12.43)
    const Price = Rates[Rates.length - 1].price
    return await this.StoreQuote(Price) ;
  }

  async CreateShipment(CreateShipmentDto: CreateShipmentDto): Promise<Object> {
    const DataQuote: DataQuote = JSON.parse(JSON.stringify(CreateShipmentDto))
    const Quote = await this.GetQuote(DataQuote);
    const { ref, cost, create_at } = await this.StoreShipment(CreateShipmentDto, Quote.amount);
    return { ref, cost, create_at }
  }

  async GetShipment(GetShipmentDto: GetShipmentDto): Promise<Shipment | Object> {
    const Shipment: Shipment = await this.ShipmentModel.findOne(GetShipmentDto)
    if (!Shipment) return { ref: "" }
    return Shipment
  }

  async DeleteShipment(DeteleShipmentDto: DeteleShipmentDto): Promise<Object> {
    const Shipment: Shipment = await this.ShipmentModel.findOneAndDelete(DeteleShipmentDto)
    if (!Shipment) return {
      status : 'NOT OK' ,
      message : "Shipment not found"
    }
    return {
      status: "OK" ,
      message : "shipment has been deleted",
    }
  }

}
