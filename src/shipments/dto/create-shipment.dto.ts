import { Data } from './basic-shipment.dto';

import { Type } from 'class-transformer';

enum Status {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Delivery = 'delivery',
  Completed = 'completed',
  Failed = 'failed',
}
export class CreateShipmentDto {
  @Type(() => Data)
  data: Data;

  status: Status;
}
