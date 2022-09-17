import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { Response } from "express";

@Controller("shipments")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  async create(@Body() createShipmentDto: CreateShipmentDto) {
    return await this.shipmentService.create(createShipmentDto);
  }

  @Get()
  async findAll() {
    return await this.shipmentService.findAll();
  }

  @Get(":ref")
  async findOneByRef(@Param("ref") ref: string) {
    return await this.shipmentService.findOneByRef(ref);
  }

  @Delete(":ref")
  async deleteByRef(@Param("ref") ref: number) {
    return await this.shipmentService.deleteByRef(ref);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.shipmentService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateShipmentDto: UpdateShipmentDto) {
  //   return await this.shipmentService.update(+id, updateShipmentDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.shipmentService.remove(+id);
  // }
}
