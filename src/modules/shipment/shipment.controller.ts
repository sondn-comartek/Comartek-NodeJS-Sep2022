import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { DataQuote } from './dto/get-quote.dto';
import { GetShipmentDto } from './dto/get-shipment.dto'
import { DeteleShipmentDto } from './dto/delete-shipment.dto';

@Controller('client')
export class ShipmentController {
  constructor(private readonly ShipmentService: ShipmentService) {}

  @Post('getquote')
  GetQuote( @Body('data') DataQuote: DataQuote) {
    return this.ShipmentService.GetQuote(DataQuote);
  }

  @Post('createshipment')
  CreateShipment( @Body('data') CreateShipmentDto: CreateShipmentDto ) {
    return this.ShipmentService.CreateShipment(CreateShipmentDto)
  }

  @Get('getshipment')
  GetShipment(@Body('data') GetShipmentDto: GetShipmentDto ) {
    return this.ShipmentService.GetShipment(GetShipmentDto);
  }

  @Post('deleteshipment')
  DeleteShipment(@Body('data') DeteleShipmentDto: DeteleShipmentDto) {
    return this.ShipmentService.DeleteShipment(DeteleShipmentDto)
  }

}
