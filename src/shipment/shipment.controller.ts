import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { RolesGuard } from 'src/roles-guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/enums/role.enum';
@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
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
