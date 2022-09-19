import { Type } from 'class-transformer';
import { IsNotEmpty, IsString ,ValidateNested} from 'class-validator';
class DataDto {
  @IsNotEmpty() 
  @IsString()
  ref: string
}
export class getShipmentDto {

  @IsNotEmpty() 
  @Type(() => DataDto)
  @ValidateNested()
  data: DataDto
}
