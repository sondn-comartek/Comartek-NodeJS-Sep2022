import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { GetShipmentDto } from './dto/get-shipment.dto';
// import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { DeleteShipmentDto } from './dto/delete-shipment.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  // @Get()
  // findAll() {
  //   return this.shipmentsService.findAll();
  // }

  @Get()
  findOne(@Body() getShipmentDto: GetShipmentDto) {
    const { ref } = getShipmentDto.data;
    return this.shipmentsService.findOne(ref);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateShipmentDto: UpdateShipmentDto,
  // ) {
  //   return this.shipmentsService.update(+id, updateShipmentDto);
  // }

  @Delete()
  remove(@Body() deleteShipmentDto: DeleteShipmentDto) {
    const { ref } = deleteShipmentDto.data;
    return this.shipmentsService.remove(ref);
  }
}
