import { Injectable } from '@nestjs/common';
import * as Convert from 'convert-units';
import { Quote } from './interfaces'
import { Shipment } from './interfaces';
import { DataQuote, UpdateShipmentStatusDto } from './dto';
import { GetShipmentDto } from './dto'
import { CreateShipmentDto } from './dto';
import { DeteleShipmentDto } from './dto';
import { GenRandomNumber } from 'src/ultils';
import { ShipmentRepository } from './repositories';
import { QuoteRepository } from './repositories';
import { RateRepository } from './repositories';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@Injectable()
export class ShipmentService {
  constructor(
    private readonly RateRepository: RateRepository ,
    private readonly QuoteRepository: QuoteRepository ,
    private readonly ShipmentRepository: ShipmentRepository ,
    @InjectQueue('shipment') private readonly ShipmentQueue: Queue
  ) {}

  async GetQuote(DataQuote: DataQuote): Promise<Quote> {
    const Amount = DataQuote.package?.grossWeight?.amount;
    const Unit = DataQuote.package?.grossWeight?.unit;
    const WeightByGam: number = Convert(Amount).from(Unit).to('g');
    const Rates = await this.RateRepository.FindAll({
      weight : { $lte : WeightByGam }
    }, null, { sort: { price: -1 } })
    if (Rates.length === 0) return await this.QuoteRepository.Create({
      amount : 12.43
    })
    const Price = Rates[0].price
    return await this.QuoteRepository.Create({
      amount : Price
    });
  }

  async CreateShipment(CreateShipmentDto: CreateShipmentDto): Promise< Record < string , unknown > > {
    const DataQuote: DataQuote = JSON.parse(JSON.stringify(CreateShipmentDto))
    const Quote = await this.GetQuote(DataQuote);
    const job = await this.ShipmentQueue.add('create' , {
      ...DataQuote,
      cost: Quote.amount,
      ref: GenRandomNumber(10)
    })
    return {
        ref : job.data.ref ,
        cost : job.data.cost ,
        created_at : new Date(job.timestamp)
     }
  }

  async GetShipment(GetShipmentDto: GetShipmentDto): Promise<Shipment | any > {
    const Shipment = await this.ShipmentRepository.FindOne(GetShipmentDto, null, { lean: true })
    if (!Shipment) return { 
      ref: "" 
    }
    return Shipment
  }

  async DeleteShipment(DeteleShipmentDto: DeteleShipmentDto): Promise<Record < string , unknown > > {
    const Shipment = await this.ShipmentRepository.FindOneAndDelete(DeteleShipmentDto)
    if (!Shipment) return {
      status : 'NOT' ,
      message : "Shipment not found"
    }
    return {
      status: "OK" ,
      message : "shipment has been deleted",
    }
  }

  async UpdateShipment(UpdateShipmentStatusDto: UpdateShipmentStatusDto): Promise< Record<string,unknown> | any >{
    return await this.ShipmentRepository.FindOneAndUpdate(
      {
      ref : UpdateShipmentStatusDto.ref 
      }
      , {
        status: UpdateShipmentStatusDto.status
      } , 
      { 
        new: true
      })
  }
}
