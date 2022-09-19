import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { DeleteShipmentDto } from './dto/delete-shipment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateShipmentStatusDto } from './dto/update-shipment.dto';
import { Role } from 'src/user/roles/role.enum';
import { Roles } from 'src/user/roles/roles.decorator';
import { RolesGuard } from 'src/user/roles/roles.guard';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller('shipment')
export class ShipmentController {
  constructor(
    private readonly shipmentService: ShipmentService,
    @InjectQueue('createShipment') private createShipmentQueue: Queue
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/createshipment')
  async create(@Body() createShipmentDto: CreateShipmentDto) {
    await this.createShipmentQueue.add('createShipment', {
      createShipmentDto: createShipmentDto
    })
    // return this.shipmentService.create(createShipmentDto);
  }

  @Get('/getshipment')
  findOne(@Query() queryParam: any): any {
    return this.shipmentService.findOne(queryParam);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('update-shipment-status')
  updateShipmentStatus(@Body() updateShipmentStatusDto: UpdateShipmentStatusDto) {
    return this.shipmentService.updateShipmentStatus(updateShipmentStatusDto);
  }

  @Post('/deleteshipment')
  remove(@Body() deleteShipmentDto: DeleteShipmentDto) {
    return this.shipmentService.remove(deleteShipmentDto);
  }
}
