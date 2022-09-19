import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rate } from "../common/entities";
import { WeightUnitsEnum } from "../common/enums";
import { generateQuoteId } from "./helpers/generate-quote-id";
import { CreateQuoteDto } from "./dto/create-quote.dto";

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Rate.name) private readonly rateEntity: Model<Rate>
  ) { }

  async getQuote(createQuoteDto: CreateQuoteDto): Promise<Object> {
    // const ratesData = [
    //     { weight: 500, price: 12.43 },
    //     { weight: 750, price: 15.42 },
    //     { weight: 1000, price: 15.42 },
    //     { weight: 2000, price: 20.77 },
    //     { weight: 3000, price: 26.07 },
    //     { weight: 4000, price: 31.43 },
    //     { weight: 5000, price: 36.77 },
    //     { weight: 6000, price: 42.13 },
    //     { weight: 7000, price: 47.49 },
    //     { weight: 8000, price: 52.83 },
    //     { weight: 9000, price: 58.83 },
    //     { weight: 10000, price: 63.54 },
    //     { weight: 11000, price: 88.19 },
    //     { weight: 12000, price: 88.19 },
    //     { weight: 13000, price: 88.19 },
    //     { weight: 14000, price: 88.19 },
    //     { weight: 15000, price: 88.15 },
    // ]

    // await this.rateEntity.insertMany(ratesData)
    // const rates = await this.rateEntity.find({});

    // return { rates };
    const id: string = await generateQuoteId();
    let cost: number;
    let { amount, unit } = createQuoteDto.package.grossWeight;

    // If unit is "kg", convert amount to "g"
    if (unit === WeightUnitsEnum.Kilogram) {
      amount *= 1000;
    }

    // Find all rate contains weight greater or equal amount
    const filter = {
      weight: {
        $gte: amount,
      },
    };

    const rates: Rate[] = await this.rateEntity.find(filter).sort({ price: 1 });

    if (rates.length === 0) {
      cost = 100;
    } else {
      cost = rates[0].price;
    }

    return {
      data: {
        id,
        amount: cost,
      },
    };
  }
}
