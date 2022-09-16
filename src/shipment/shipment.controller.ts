import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { Response } from "express";

@Controller("shipments")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) { }

  @Post()
  async create(@Body() createShipmentDto: CreateShipmentDto, @Res() response: Response) {
    let statusCode;
    const data = await this.shipmentService.create(createShipmentDto);

    if (data.hasOwnProperty("error")) {
      statusCode = HttpStatus.BAD_REQUEST;
    } else {
      statusCode = HttpStatus.OK;
    }

    return response.status(statusCode).json({ data })
  }

  @Get()
  async findAll() {
    return { data: await this.shipmentService.findAll() }
  }

  @Get(":ref")
  async findOneByRef(@Param("ref") ref: number, @Res() response: Response) {
    let statusCode;
    const data = await this.shipmentService.findOneByRef(ref);

    if (data.hasOwnProperty("shipment")) {
      statusCode = HttpStatus.OK;
    } else {
      statusCode = HttpStatus.NOT_FOUND;
    }

    return response.status(statusCode).json({ data });
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
