import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rate } from "../common/entities/rate.entity";
import { Shipment } from "./entities/shipment.entity";
import { WeightUnitsEnum } from "../common/enums";
import { ShipmentErrorMessage } from "./constants";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from 'bull';
import { CreateShipmentQueue } from './constants/index';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel(Shipment.name) private shipmentEntity: Model<Shipment>,
    @InjectModel(Rate.name) private rateEntity: Model<Rate>,
    @InjectQueue(CreateShipmentQueue) private shipmentQueue: Queue
  ) { }

  // async create(createShipmentDto: CreateShipmentDto): Promise<Object> {
  //   const ref = createShipmentDto.ref;
  //   const filter = { ref };

  //   const existedRefNumber = await this.shipmentEntity.findOne(filter);
  //   if (existedRefNumber) {
  //     throw new HttpException(
  //       ShipmentErrorMessage.ExistedRef(ref),
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }

  //   let cost: number;
  //   let { amount, unit } = createShipmentDto.package.grossWeight;

  //   if (unit === WeightUnitsEnum.Kilogram) {
  //     amount *= 1000;
  //   }

  //   const rates: Rate[] = await this.rateEntity
  //     .find({ weight: { $gte: amount } })
  //     .sort({ price: 1 });

  //   cost = rates[0].price;

  //   // const shipment: Shipment = await this.shipmentEntity.create(
  //   //   { ...createShipmentDto, cost }
  //   // );

  //   const shipment = { ...createShipmentDto, cost };

  //   // const job = this.shipmentQueue.add(shipment)

  //   return {
  //     data: {
  //       shipment: {
  //         ref,
  //         createdAt: new Date(),
  //         cost,
  //       },
  //     },
  //   };

  // return {
  //   data: {
  //     shipment: {
  //       ref,
  //       createdAt: shipment.createdAt,
  //       cost,
  //     },
  //   },
  // };
  // }

  async create(createShipmentDto: CreateShipmentDto): Promise<any> {
    const { ref } = createShipmentDto;

    await this.validateShipmentData(ref);

    const { amount, unit } = createShipmentDto.package.grossWeight;
    const cost = await this.calculateCost(amount, unit);
    const createShipmentData = { ...createShipmentDto, cost };

    await this.shipmentQueue.add("handleCreateShipment", createShipmentData);

    return {
      message: "Your shipment is creating...",
      data: {
        ref,
        cost
      }
    }
  }

  async calculateCost(amount: number, unit: string): Promise<number> {
    let cost: number;

    if (unit === WeightUnitsEnum.Kilogram) {
      amount *= 1000;
    }

    const rates: Rate[] = await this.rateEntity
      .find({ weight: { $gte: amount } })
      .sort({ price: 1 });

    // Not discount
    if (rates[0].discount === 1) {
      cost = rates[0].price;
    } else {
      cost = rates[0].price - rates[0].price * rates[0].discount;
    }

    return cost;
  }

  async validateShipmentData(ref: string) {
    const filter = { ref };

    const exitedShipment = await this.shipmentEntity.findOne(filter);
    if (exitedShipment) {
      throw new HttpException(
        ShipmentErrorMessage.ExistedRef(ref),
        HttpStatus.BAD_REQUEST
      );
    }

    return;
  }

  async findAll(): Promise<Object> {
    const shipments = await this.shipmentEntity.find({});
    return { data: { shipments } };
  }

  async findOneByRef(ref: string): Promise<Object> {
    const filter = { ref };

    const shipment: Shipment = await this.shipmentEntity.findOne(filter);
    if (!shipment) {
      throw new HttpException(
        ShipmentErrorMessage.NotFound(ref),
        HttpStatus.NOT_FOUND
      );
    }

    return { data: { shipment } };
  }

  async deleteByRef(ref: string): Promise<Object> {
    const filter = { ref };
    const shipment = await this.shipmentEntity.findOne(filter);

    if (shipment) {
      await this.shipmentEntity.deleteOne(filter);

      return {
        status: "OK",
        message: "Shipment has been deleted",
      };
    }

    return {
      status: "NOK",
      message: "Shipment not found",
    };
  }

  async updateShipmentStatus(ref: string, status: string): Promise<Object> {
    const filter = { ref };
    const shipment = await this.shipmentEntity.findOne(filter);

    if (!shipment) {
      throw new HttpException(
        ShipmentErrorMessage.NotFound(ref),
        HttpStatus.NOT_FOUND
      );
    }

    await this.shipmentEntity.updateOne(filter, { $set: { status } });

    return {
      message: "Update thành công",
    };
  }

  // async findOne(id: number) {
  //   return `This action returns a #${id} shipment`;
  // }

  // async update(id: number, updateShipmentDto: UpdateShipmentDto) {
  //   return `This action updates a #${id} shipment`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} shipment`;
  // }
}
