import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { UseGuards } from "@nestjs/common/decorators";
import { JWTAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UpdateShipmentStatusDto } from "./dto/update-shipment-status.dto";
import { Roles } from "../auth/decorators/role.decorator";
import { Role } from "../common/enums";
import { RolesGuard } from "../auth/guards/role.guard";

@Controller("shipments")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  // @UseGuards(JWTAuthGuard)
  // @Post()
  // async create(@Body() createShipmentDto: CreateShipmentDto) {
  //   const { ref } = createShipmentDto;
  //   const { amount, unit } = createShipmentDto.package.grossWeight;

  //   await this.shipmentService.validateShipmentData(ref);

  //   const cost = await this.shipmentService.calculateCost(amount, unit);
  //   const shipmentData = { ...createShipmentDto, cost };

  //   await this.shipmentQueue.add("handleCreateShipment", shipmentData);

  //   return {
  //     message: "Your shipment is creating...",
  //     data: {
  //       ref,
  //       createdAt: new Date(),
  //       cost,
  //     },
  //   };
  // }

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
  async updateShipmentStatus(
    @Param("ref") ref: string,
    @Body() updateShipmentStatusDto: UpdateShipmentStatusDto
  ) {
    return await this.shipmentService.updateShipmentStatus(
      ref,
      updateShipmentStatusDto.status
    );
  }
}
