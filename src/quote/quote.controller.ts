import { Controller, Get, Res } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators";
import { CreateQuoteDto } from "./dto/create-quote.dto";
import { QuoteService } from "./quote.service";

@Controller("quotes")
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) { }

  @Get()
  async getQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return await this.quoteService.getQuote(createQuoteDto);
  }
}
