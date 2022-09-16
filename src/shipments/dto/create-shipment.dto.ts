import { Data } from './basic-shipment.dto';

import { Type } from 'class-transformer';

export class CreateShipmentDto {
  @Type(() => Data)
  data: Data;
}
