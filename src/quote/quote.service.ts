import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote, QuoteDocument} from './entities/quote.entity';
import { Rate, RateDocument } from './entities/rate.entity';
@Injectable()
export class QuoteService {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>, @InjectModel(Rate.name) private rateModel: Model<RateDocument>){}
  async create(createQuoteDto: CreateQuoteDto) {
   const amount = createQuoteDto?.grossWeight?.amount
   const unit = createQuoteDto?.grossWeight?.unit
   const weight = this.convertWeight(amount, unit)
    const rates = await this.rateModel.find().sort({price: 'asc'}).exec()
     let isWeight = 0
     const weightAndPrice = {weight: 0, price: 0}
      rates.forEach((rate, index)=>{
      const {rate: weightPoint, price} = rate
      if(isWeight < 0) return;
      isWeight = weight - Number(weightPoint)
      weightAndPrice.weight = Number(weightPoint)
      weightAndPrice.price = Number(price)
    })
    const createQuote = new this.quoteModel(createQuoteDto)
    const created =  await createQuote.save()
    return  {
       id: created?._id,
      amount: weightAndPrice?.price
    }
  }
  convertWeight(weight, unit){ // convert kg to g
    let weightKey = 0
    switch(unit){
      case 'kg':{
        weightKey = 1000;
        break;
      }
      case 'g':{
        weightKey = 1;
        break;
      }
      default: weightKey = 10;
    }
    return weight * weightKey
  }
  findAll() {
    return `This action returns nest all quote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    return `This action updates a #${id} quote`;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
