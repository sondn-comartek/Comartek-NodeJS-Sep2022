import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put
} from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { UseGuards } from "@nestjs/common/decorators";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { Roles } from "src/auth/decorators/role.decorator";
import { Role } from "src/common/enums";
import { RolesGuard } from "src/auth/guards/role.guard";

@Controller("shipments")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) { }

  @UseGuards(JWTAuthGuard)
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
  async deleteByRef(@Param("ref") ref: string) {
    return await this.shipmentService.deleteByRef(ref);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put(":ref")
  async updateShipmentStatus(@Param("ref") ref: string, @Body() updateShipmentStatusDto: UpdateShipmentStatusDto) {
    return await this.shipmentService.updateShipmentStatus(ref, updateShipmentStatusDto.status)
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
