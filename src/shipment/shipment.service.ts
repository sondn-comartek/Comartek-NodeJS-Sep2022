import { Shipment, ShipmentDocument } from './entities/shipment.entity';
import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>,
    @InjectQueue('serial') private serialQueue: Queue,
  ) {}
  async create(createShipmentDto: CreateShipmentDto) {
    const { id: quoteID, price } = createShipmentDto?.data?.quote;
    try {
      let refString = this.genRandString(10);
      const queueData = await this.serialQueue.add('create_serial', {
        quote_id: quoteID,
        ref: refString,
        cost: price,
      });
      return queueData?.data;
    } catch (error) {
      throw Error(error);
    }
  }
  async createShipmentIntoDB(shipmentData) {
    const createdShipment = await this.shipmentModel.create(shipmentData);
    return createdShipment;
  }
  async counterShipment(): Promise<number> {
    const total = await this.shipmentModel.countDocuments();
    return total;
  }
  genRandString(length) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  findAll() {
    return `This action returns all shipment`;
  }

  async findOne(ref: string) {
    try {
      const result = await this.shipmentModel
        .aggregate([
          {
            $match: { ref: ref },
          },
          {
            $lookup: {
              from: 'quotes',
              localField: 'quotes._id',
              foreignField: 'quote._id',
              as: 'quote',
            },
          },
        ])
        .exec();
      if (result) {
        const shipment = result[0];
        const quoteResult = result[0]?.quote;
        const quoteDetail = quoteResult[0];
        return {
          data: {
            ref: shipment?.ref,
            ...quoteDetail,
          },
        };
      } else {
        return {
          data: {
            ref: '',
          },
        };
      }
    } catch (error) {
      return {
        message: {
          status: 404,
          error: error,
        },
      };
    }
  }

  async update(updateShipmentDto: UpdateShipmentDto) {
    const { shipmentID, status } = updateShipmentDto;

    try {
      const shipmentUpdate = await this.shipmentModel.findByIdAndUpdate(
        shipmentID,
        { status: status },
      );
      if (typeof shipmentUpdate == 'object') {
        return {
          data: {
            status: 'OK',
            message: 'update success',
            shipment: shipmentUpdate,
          },
        };
      }
      return {
        data: {
          status: 404,
          message: 'update fail',
        },
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async remove(ref: string) {
    try {
      const deletedShipment = await this.shipmentModel.deleteOne({ ref: ref });
      let deleteCounter = deletedShipment?.deletedCount;
      if (deleteCounter > 0) {
        return {
          data: {
            status: 'OK',
            message: 'delete shipment success',
          },
        };
      }
      return {
        data: {
          status: 'NOK',
          message: 'shipment not found',
        },
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
