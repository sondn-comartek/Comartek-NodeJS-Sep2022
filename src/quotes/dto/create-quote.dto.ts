import { Data } from './basic-quote.dto';

import { Type } from 'class-transformer';

export class CreateQuoteDto {
  @Type(() => Data)
  data: Data;
}
