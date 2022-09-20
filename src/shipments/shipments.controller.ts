import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { GetShipmentDto } from './dto/get-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { DeleteShipmentDto } from './dto/delete-shipment.dto';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/users/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('shipments')
export class ShipmentsController {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    @InjectQueue('shipment') private readonly shipmentQueue: Queue,
  ) {}

  @Post()
  async create(@Body() createShipmentDto: CreateShipmentDto) {
    try {
      await this.shipmentQueue.add(
        'createShipment',
        {
          createShipmentDto,
        },
        { delay: 3000 },
      );

      return `Creating new shipment...`;
    } catch (e) {
      throw e;
    }

    // return this.shipmentsService.create(createShipmentDto);
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    return this.shipmentsService.update(id, updateShipmentDto);
  }

  @Delete()
  remove(@Body() deleteShipmentDto: DeleteShipmentDto) {
    const { ref } = deleteShipmentDto.data;
    return this.shipmentsService.remove(ref);
  }
}
