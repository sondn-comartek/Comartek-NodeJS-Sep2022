import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment, ShipmentDocument } from './schemas/shipment.schema';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { Quote, QuoteDocument } from 'src/quotes/schemas/quote.schema';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectModel(Shipment.name)
    private readonly modelShipment: Model<ShipmentDocument>,
    @InjectModel(Quote.name) private readonly modelQuote: Model<QuoteDocument>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto) {
    const { data } = createShipmentDto;

    const quoteId = data.quote.id;
    const quote = await this.modelQuote.findOne({ 'data.id': quoteId });

    // Random number in 10 character
    const ref = Math.random().toString(36).slice(2, 12);
    const createdAt = new Date();
    const cost = quote.data.cost;

    data.ref = ref;
    data.cost = cost;
    data.createdAt = createdAt;

    await new this.modelShipment({
      ...createShipmentDto,
    }).save();

    return {
      data: [
        {
          ref,
          createdAt,
          cost,
        },
      ],
    };
  }

  async findOne(ref: string) {
    const shipment = await this.modelShipment.findOne({
      'data.ref': ref,
    });

    return shipment
      ? {
          data: shipment.data,
        }
      : {
          data: {
            ref: '',
          },
        };
  }

  async remove(ref: string) {
    const shipment = await this.modelShipment.findOne({
      'data.ref': ref,
    });

    if (!shipment) {
      return {
        data: [
          {
            status: 'NOK',
            message: 'Shipment not found',
          },
        ],
      };
    }

    await this.modelShipment.deleteOne({
      'data.ref': ref,
    });

    return {
      data: [
        {
          status: 'OK',
          message: 'Shipment has been deleted',
        },
      ],
    };
  }
}
