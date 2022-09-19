import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested, IsString} from 'class-validator';
class ContactDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  phone: string
}

class AddressDto {
  @IsNotEmpty()
  @IsString()
  country_code: string

  @IsNotEmpty()
  @IsString()
  locality: string

  @IsNotEmpty()
  @IsString()
  postal_code: string

  @IsNotEmpty()
  @IsString()
  address_line1: string
}

class LocationInfoDto {
  @IsNotEmpty()
  @Type(() => ContactDto)
  @ValidateNested()
  contact: ContactDto

  @IsNotEmpty()
  @Type(() => AddressDto)
  @ValidateNested()
  address: AddressDto
}

class GrossWeightDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsString()
  unit: string
}
class DimentionDto {
  @IsNotEmpty()
  @IsNumber()
  height: number

  @IsNotEmpty()
  @IsNumber()
  width: number

  @IsNotEmpty()
  @IsNumber()
  length: number

  @IsNotEmpty()
  @IsString()
  unit: string
}
export class PackageDto {
  @IsNotEmpty()
  @Type(() => GrossWeightDto)
  @ValidateNested()
  grossWeight: GrossWeightDto

  @IsNotEmpty()
  @Type(() => DimentionDto)
  @ValidateNested()
  dimensions : DimentionDto
}
class QuoteDto {

  @IsNotEmpty()
  @Type(() => LocationInfoDto)
  @ValidateNested()
  origin : LocationInfoDto

  @IsNotEmpty()
  @Type(() => LocationInfoDto)
  @ValidateNested()
  destination : LocationInfoDto


  @IsNotEmpty()
  @Type(() => PackageDto)
  @ValidateNested()
  package : PackageDto


  
 
}
export class getQuoteDto {
  @IsNotEmpty() 
  @Type(() => QuoteDto)
  @ValidateNested()
  data: QuoteDto
}

