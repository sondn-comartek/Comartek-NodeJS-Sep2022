import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { DeleteShipmentDto } from './dto/delete-shipment.dto';
import { Shipment, ShipmentSchema } from './entities/shipment.entity';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { ShipmentStatus } from './shipment.status';
import { UpdateShipmentStatusDto } from './dto/update-shipment.dto';
import { QuoteService } from 'src/quote/quote.service';

@Injectable()
export class ShipmentService {
  private shipments: CreateShipmentDto[] = [];

  constructor(
    @InjectModel('Shipment') private readonly shipment: Model<Shipment>,
    private readonly quoteService: QuoteService
  ) { }

  async create(createShipmentDto: CreateShipmentDto) {
    const ref = createShipmentDto.data.quote.id;
    const filter = { ref };
    const existedShipment = await this.shipment.findOne(filter);

    if (existedShipment) {
      console.log(`Shipment with quote ID ${ref} is already existed`);
      return {
        error: `Shipment with quote ID ${ref} is already existed`
      }
    }

    // Get the number value for shipments
    // Find the maximum number valhe of shipment in database
    const lastestShipment = await this.shipment.findOne().sort('-number');
    const numberOfNewShipment = lastestShipment.number + 1;

    // Getquote to check the change of rate

    // Generate reference number
    const characters = '0123456789';
    let reference_number = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      reference_number += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Get cost of shipment
    const quote = await this.quoteService.findOne(createShipmentDto.data.quote.id);
    const price = JSON.parse(JSON.stringify(quote)).price;

    const createShipment = {
      ref: reference_number,
      number: numberOfNewShipment,
      data: createShipmentDto.data,
      status: ShipmentStatus.PENDING,
      cost: price,
      created_at: Date.now()
    }

    const newShipment = await this.shipment.create(createShipment);
    if (newShipment) {
      console.log("This action creates and returns a new shipment");
      return {
        message: "This action creates and returns a new shipment",
        data: [
          {
            ref: reference_number,
            created_at: createShipment.created_at,
            cost: createShipment.cost
          }]
      }
    }
    console.log("Can not create a new shipment");
    return {
      message: "Can not create a new shipment",
      data: [
        {
          ref: "",
          created_at: "",
          cost: 0
        }]
    }
  }

  async findAll() {
    const shipmentList = await this.shipment.find({});
    return `This action returns all shipment ${shipmentList}`;
  }

  async findOne(queryParam: any): Promise<any> {
    const shipment = await this.shipment.findOne({ ref: queryParam.ref }).exec();
    if (!shipment) {
      return {
        error: `Shipment with ref #${queryParam.ref} not found`,
        data: {
          ref: ""
        }
      }
    }
    return {
      message: `This action returns a #${queryParam.ref} shipment`,
      data: { ...JSON.parse(JSON.stringify(shipment)).data },
    }
  }

  async updateShipmentStatus(updateShipmentStatusDto: UpdateShipmentStatusDto) {
    const shipment = await this.shipment.findOne({ ref: updateShipmentStatusDto.data.ref });
    if (!shipment) {
      throw new Error("Shipment need to update not found");
    }
    shipment.status = updateShipmentStatusDto.data.status;
    const updatedShipment = await shipment.save();
    if (updatedShipment instanceof Error) {
      throw updatedShipment;
    }
    return {
      message: `Change status of shipment with a ref #${updateShipmentStatusDto.data.ref} successfully`,
      data: updatedShipment
    }
  }

  async remove(deleteShipmentDto: DeleteShipmentDto) {
    const result = await this.shipment.deleteOne({ ref: deleteShipmentDto.data.ref });
    if (result.deletedCount == 1) {
      return {
        message: `This action delete a #${deleteShipmentDto.data.ref} shipment`,
        data: [
          {
            status: "OK",
            message: "shipment has been deleted"
          }]
      }
    }
    return {
      data: [
        {
          status: "NOK",
          message: "shipment not found"
        }]
    }
  }
}

