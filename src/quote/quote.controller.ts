import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateReductionFactorDto } from './dto/create-reduction-factor.dto';
import { GetQuoteDto } from './dto/get-quote.dto';
import { QuoteService } from './quote.service';

@Controller('client')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('getquote')
  findAll(@Body() getQuoteDto: GetQuoteDto) {
    return this.quoteService.findAll(getQuoteDto);
  }

  @Post('create-reduction-factor')
  create(@Body() createReductionFactorDto: CreateReductionFactorDto) {
    return this.quoteService.createReductionFactor(createReductionFactorDto)
  }
}
