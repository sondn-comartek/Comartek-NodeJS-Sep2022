import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { DataQuote } from './dto/get-quote.dto';
import { GetShipmentDto } from './dto/get-shipment.dto'
import { DeteleShipmentDto } from './dto/delete-shipment.dto';
import { JwtGruad } from '../auth/guards';
import { Request } from 'express'
import { RoleGuards } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator';
import { Role } from '../auth/constant';
import { UpdateShipmentStatusDto } from './dto';

@Controller('client')
export class ShipmentController {
  constructor(private readonly ShipmentService: ShipmentService) {}
  
  @Post('getquote')
  GetQuote( @Body('data') DataQuote: DataQuote ) {
    return this.ShipmentService.GetQuote(DataQuote);
  }
  @Roles(Role.ADMIN , Role.MEMBER)
  @UseGuards(JwtGruad , RoleGuards)
  @Post('createshipment')
  CreateShipment( @Body('data') CreateShipmentDto: CreateShipmentDto, @Req() Req: Request ) {
    return this.ShipmentService.CreateShipment(CreateShipmentDto)
  }

  @UseGuards(JwtGruad)
  @Get('getshipment')
  GetShipment(@Body('data') GetShipmentDto: GetShipmentDto ,@Req() Req: Request) {
    return this.ShipmentService.GetShipment(GetShipmentDto);
  }

  @Roles(Role.ADMIN )
  @UseGuards(JwtGruad , RoleGuards)
  @Post('updateshipment-status')
  UpdateShipmentStatus(@Body('data') UpdateShipmentStatusDto: UpdateShipmentStatusDto , @Req() Req: Request) {
    return this.ShipmentService.UpdateShipment(UpdateShipmentStatusDto)
  }

  @Post('deleteshipment')
  DeleteShipment(@Body('data') DeteleShipmentDto: DeteleShipmentDto , @Req() Req: Request) {
    return this.ShipmentService.DeleteShipment(DeteleShipmentDto)
  }

}
