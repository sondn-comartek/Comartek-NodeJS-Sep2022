import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { Rate } from "../common/entities/rate.entity";
import { Shipment } from "./entities/shipment.entity";
import { WeightUnitsEnum } from "../common/enums/weight-unit.enum";
import { ShipmentErrorMessage } from "./constants";

@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel(Shipment.name) private shipmentEntity: Model<Shipment>,
    @InjectModel(Rate.name) private rateEntity: Model<Rate>
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Object> {
    const ref = createShipmentDto.ref;
    const filter = { ref };

    const existedRefNumber = await this.shipmentEntity.findOne(filter);
    if (existedRefNumber) {
      throw new HttpException(
        ShipmentErrorMessage.ExistedRef(ref),
        HttpStatus.BAD_REQUEST
      );
    }

    const shipment: Shipment = await this.shipmentEntity.create(
      createShipmentDto
    );

    let cost: number;
    let { amount, unit } = createShipmentDto.package.grossWeight;

    if (unit === WeightUnitsEnum.Kilogram) {
      amount *= 1000;
    }

    const rates: Rate[] = await this.rateEntity
      .find({ weight: { $gte: amount } })
      .sort({ price: 1 });

    if (rates.length === 0) {
      cost = 100;
    } else {
      cost = rates[0].price;
    }

    return {
      data: {
        shipment: {
          ref,
          createdAt: shipment.createdAt,
          cost,
        },
      },
    };
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

  async deleteByRef(ref: number): Promise<Object> {
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
