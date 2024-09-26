import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ShipmentService } from './shipment/shipment.service';
import { QuoteService } from './quote/quote.service';
import { GetQuoteDto } from './quote/dto/get-quote.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly  shipmentService: ShipmentService,
    // private readonly quoteService: QuoteService
  ) {}

  // @Post('/getquote')
  // findAll(@Body() getQuoteDto: GetQuoteDto) {
  //   return this.quoteService.findAll(getQuoteDto);
  // }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
