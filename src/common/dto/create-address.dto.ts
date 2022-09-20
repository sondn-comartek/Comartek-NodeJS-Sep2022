import {
  IsString,
  IsNotEmpty,
  IsPostalCode,
  IsBoolean,
  IsISO31661Alpha2,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsISO31661Alpha2()
  readonly countryCode: string;

  @IsNotEmpty()
  @IsString()
  readonly locality: string;

  @IsNotEmpty()
  @IsPostalCode('any')
  readonly postalCode: string;

  @IsNotEmpty()
  @IsString()
  readonly addressLine: string;

  @IsBoolean()
  readonly organisation?: boolean;
}
