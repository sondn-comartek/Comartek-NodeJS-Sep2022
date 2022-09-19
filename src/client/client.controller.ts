import { Controller, Get, Post, Body,Req, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ClientService } from './client.service';
import { getQuoteDto } from './dto/client-quote.dto';
import { getShipmentDto } from './dto/client-getshipment.dto';
import { createShipmentDto, updateShipmentStatusDto } from './dto/client-shipment.dto';
import { Shipment } from '../interface/quote.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/auth/role.enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService,
              @InjectQueue('createshipment') private shipmentQueue: Queue) {}

  @Post('getquote')
  async getQuote(@Body() quoteDto: getQuoteDto) {
    const price:Number = await this.clientService.getPrice(quoteDto.data.package);
    const quoteObj = await this.clientService.storeQuote(quoteDto.data)
    return {
      data: [
        {
          id: quoteObj.id.toString(),
          amount: price
        }
      ]
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('creatshipment')
  async createShipment(@Body() body: createShipmentDto) {
    
    
    const refNumChar = 10

    const quote = await this.clientService.getQuote(body.data.quote.id)
    // console.log(quote)
    if(!quote)
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'quote not exist',
      }, HttpStatus.BAD_REQUEST);
    const price = await this.clientService.getPrice(quote.package)
    
    const randomString = this.clientService.randomString(refNumChar)
    
    const shipment: Shipment = {
      ref: randomString,
      origin: quote.origin,
      destination: quote.destination,
      package: quote.package
    }

    const shipmentObj = await this.clientService.storeShipment(shipment)
    const datestring = (shipmentObj.createdAt.getUTCFullYear().toString() + "-" + shipmentObj.createdAt.getUTCMonth().toString().padStart(2, '0')
                        + '-' + shipmentObj.createdAt.getUTCDate().toString().padStart(2, '0') + "T" + shipmentObj.createdAt.getUTCHours().toString().padStart(2, '0')
                        + ":" +shipmentObj.createdAt.getUTCMinutes().toString().padStart(2, '0') + ":" + shipmentObj.createdAt.getUTCSeconds().toString().padStart(2, '0') + "+0000")
    await this.shipmentQueue.add({
      id: shipmentObj.id,
    });
    return {
      data: [
        {
          ref: randomString,
          created_at: datestring,
          cost: price
        }
      ]
    }
  }

  @Get('getshipment')
  async findAll(@Req() request: Request, @Body() shipment: getShipmentDto) {
    const shipObj = await this.clientService.getShipment(shipment.data.ref)
    if(!shipObj)
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'shipment not exist',
      }, HttpStatus.BAD_REQUEST);
    return {
      data: {
        status: shipObj.status,
        ref: shipObj.ref,
        origin: shipObj.origin,
        describe: shipObj.destination,
        package: shipObj.package
      }
    }
  }


  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('updateshipmentstatus') 
  async UpdateShipmentStatus( @Body() update: updateShipmentStatusDto) {
    const updateStatus = await this.clientService.updateShipment(update.ref, update.status)
    if(updateStatus === true)
      return {message: "update status scuccess"}
    return {message: "update status fail"}
  }

  @Post('deleteshipment')
  async remove( @Body() shipment: getShipmentDto) {
    await this.clientService.deleteShipment(shipment.data.ref)
    return {
      data: [
          {
            status: "OK",
            message: "shipment has been deleted"
          }
      ]
    }
  }
}
