import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from './schemas/quote.schema';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Rate, RateDocument } from './schemas/rate.schema';
import convert, { Unit } from 'convert-units';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name) private readonly modelQuote: Model<QuoteDocument>,
    @InjectModel(Rate.name) private readonly modelRate: Model<RateDocument>,
  ) {}

  private discount = 1;
  @Cron('0 0 0 * * 5')
  async saleStart() {
    this.discount = 0.5;
  }

  @Cron('0 0 12 * * 5')
  async saleEnd() {
    this.discount = 1;
  }

  async create(createQuoteDto: CreateQuoteDto) {
    // Random number in 10 character
    const id = Math.random().toString(36).slice(2, 12);

    const { data } = createQuoteDto;
    const amount = data.package.grossWeight.amount;
    const unit: Unit = data.package.grossWeight.unit as Unit;

    const weightGam = convert(amount).from(unit).to('g').toFixed(2);

    const rate = await this.modelRate.findOne({ weight: { $gt: weightGam } });

    const price = rate ? rate.price : 100;

    data.id = id;
    data.cost = price * this.discount;

    await new this.modelQuote({
      ...createQuoteDto,
    }).save();

    return {
      data: [
        {
          id,
          cost: price,
        },
      ],
    };
  }

  findAll() {
    return `This action returns all quotes`;
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
