import { Injectable } from '@nestjs/common';
import { InjectModel }from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { convertUnit } from 'src/utils/convert-unit';
import { CreateReductionFactorDto } from './dto/create-reduction-factor.dto';
import { GetQuoteDto } from './dto/get-quote.dto';
import { Quote } from './entities/quote.entity';
import { ReductionFactor } from './entities/reduction-factor.entity';

 const DEFAULT_FRIDAY_SALE_NAME = "Friday's Sale";

@Injectable()
export class QuoteService {

  constructor(
    @InjectModel('Quote') private readonly quote: Model<Quote>,
    @InjectModel('ReductionFactor') private readonly reductionFactor: Model<ReductionFactor>
  ) {}

  async findAll(getQuoteDto: GetQuoteDto) {
    let reductionParam: number = 1;
    const quoteList = await this.quote.find({});
    const grossWeight: number = getQuoteDto.data.package.grossWeight.amount;
    const originalUnit: string = getQuoteDto.data.package.grossWeight.unit;
    const matchUnitWeight = convertUnit(grossWeight, originalUnit, 'g')
    // const matchUnitWeight = grossWeight * 1000;
    if (!quoteList) {
        return {
          error: `Can not get the quote list`
      }
    }

    // Check reduction in rate
    const reducionFactor = await this.findReductionFactor(DEFAULT_FRIDAY_SALE_NAME);
    if (reducionFactor.is_occur === true) {
        reductionParam = 0.5;
    }

    for (let quote of quoteList) {
      let quoteObject = JSON.parse(JSON.stringify(quote));
      let range = quoteObject.weight.split('-');
      if (+range[0] == 15000) {
        return {
          "data": [
            {
              "id": quoteObject._id,
              "amount": 100*reductionParam, // USD
            }]
        }
      }
      if (+range[0] <= matchUnitWeight && matchUnitWeight < +range[1]) {
        return {
          "data": [
            {
              "id": quoteObject._id,
              "amount": quoteObject.price*reductionParam, // USD
            }]
        }
      }
    }
  }

  async findOne(quoteId: string): Promise<any> {
    const quote = await this.quote.findOne({quoteId});
    if (!quote) {
      throw new Error(`Quote wit quote id ${quoteId} not found`);
    }
    return quote;
  }

  async createReductionFactor(createReductionFactorDto: CreateReductionFactorDto): Promise<any> {
    const reducionFactor = createReductionFactorDto.reducion_factor_name;
    const results = await this.reductionFactor.findOne({ reducionFactor });
    if ( results ) {
      throw new Error("The reduction factor is existed");
    }

    const newReductionFactor = await this.reductionFactor.create(createReductionFactorDto);
    if (newReductionFactor) {
      return {
        message: "This action creates and returns a new reduction factor",
        data: newReductionFactor
      }
    }
    return {
      error: "Can not create a new reduction factor"
    }
  }

  async findReductionFactor(reductionFactorName: string): Promise<CreateReductionFactorDto> {
    const reductionFactor = await this.reductionFactor.findOne({ reductionFactorName });
    if (!reductionFactor) {
      throw new Error("Reduction factor not found");
    }
    return JSON.parse(JSON.stringify(reductionFactor));
  }

  async updateReductionFactor(name: string, status: boolean): Promise<boolean> {
    const reducionFactor = await this.reductionFactor.findOneAndUpdate({reduction_factor_name: name}, {is_occur: status});
    if (!reducionFactor) {
      return false;
    }
    return true;
  }
}

