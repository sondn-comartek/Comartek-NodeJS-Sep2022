import {
  IsEmail,
  IsISO31661Alpha2,
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Quote {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class OriginContact {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: number;
}

export class OriginAdresss {
  @IsISO31661Alpha2()
  @IsNotEmpty()
  country_code: string;

  @IsString()
  @IsNotEmpty()
  locality: string;

  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  address_line1: string;

  @IsNotEmpty()
  organisation: boolean;
}
export class DestinationContact {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: number;
}
export class DestinationAddress {
  @IsISO31661Alpha2()
  @IsNotEmpty()
  country_code: string;

  @IsString()
  @IsNotEmpty()
  locality: string;

  @IsNotEmpty()
  postal_code: number;

  @IsString()
  @IsNotEmpty()
  address_line1: string;

  @IsNotEmpty()
  organisation: boolean;
}
export class PackageDimensions {
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}
export class PackageGrossWeight {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}

export class Origin {
  @Type(() => OriginContact)
  @ValidateNested()
  contact: OriginContact;

  @Type(() => OriginAdresss)
  @ValidateNested()
  address: OriginAdresss;
}
export class Destination {
  @Type(() => DestinationContact)
  @ValidateNested()
  contact: DestinationContact;

  @Type(() => DestinationAddress)
  @ValidateNested()
  address: DestinationAddress;
}

export class Package {
  @Type(() => PackageDimensions)
  @ValidateNested()
  dimensions: PackageDimensions;

  @Type(() => PackageGrossWeight)
  @ValidateNested()
  grossWeight: PackageGrossWeight;
}
export class Data {
  ref: string;

  cost: number;

  createdAt: Date;

  @IsNotEmptyObject()
  @Type(() => Quote)
  @ValidateNested()
  quote: Quote;

  @IsNotEmptyObject()
  @Type(() => Origin)
  @ValidateNested()
  origin: Origin;

  @IsNotEmptyObject()
  @Type(() => Destination)
  @ValidateNested()
  destination: Destination;

  @IsNotEmptyObject()
  @Type(() => Package)
  @ValidateNested()
  package: Package;
}
