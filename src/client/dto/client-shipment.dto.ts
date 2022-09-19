import { Type } from 'class-transformer';
import { IsNotEmpty,  ValidateNested, IsIn} from 'class-validator';

class Quote {
  @IsNotEmpty()
  id: string
}

class DataValue {
  @IsNotEmpty()
  @Type(() => Quote)
  quote: Quote
}
export class createShipmentDto {
  @IsNotEmpty() 
  @Type(() => DataValue)
  @ValidateNested()
  data: DataValue
}


export class updateShipmentStatusDto {
  @IsNotEmpty()
  ref:string

  @IsIn(['Pending', 'Confirmed', 'Deliver', 'Completed', 'Failed'])
  @IsNotEmpty()
  status: string
}
