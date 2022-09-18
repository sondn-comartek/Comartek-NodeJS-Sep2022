import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentService.create(createShipmentDto);
  }

  @Get()
  findAll() {
    return this.shipmentService.findAll();
  }

  @Get(':ref')
  findOne(@Param('ref') ref: string) {
    return this.shipmentService.findOne(ref);
  }

  @Patch()
  update(@Body() updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentService.update(updateShipmentDto);
  }

  @Delete(':ref')
  remove(@Param('ref') ref: string) {
    return this.shipmentService.remove(ref);
  }
}
