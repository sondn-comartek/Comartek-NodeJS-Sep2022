import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumberString, IsObject, ValidateNested, IsNumber, IsUppercase, Length } from 'class-validator';

export class CreateQuoteDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;
}

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly phone: string;
}

export class CreateAddressDto {
    @IsString()
    @Length(2, 2)
    @IsUppercase()
    @IsNotEmpty()
    readonly country_code: string;

    @IsString()
    @IsNotEmpty()
    readonly locality: string;

    @IsString()
    @IsNotEmpty()
    readonly postal_code: string;

    @IsString()
    @IsNotEmpty()
    readonly address_line1: string;
}

export class CreateDimensionsDto {
    @IsNumber()
    @IsNotEmpty()
    readonly height: number;

    @IsNumber()
    @IsNotEmpty()
    readonly width: number;

    @IsNumber()
    @IsNotEmpty()
    readonly length: number;

    @IsString()
    @IsNotEmpty()
    readonly unit: string;
}

export class CreateGrossWeightDto {
    @IsNumber()
    @IsNotEmpty()
    readonly amount: number;

    @IsString()
    @IsNotEmpty()
    readonly unit: string;
}

export class CreateOriginDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateContactDto)
    @ValidateNested()
    readonly contact: CreateContactDto;

    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateAddressDto)
    @ValidateNested()
    readonly address: CreateAddressDto;
}

export class CreateDestinationDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateContactDto)
    @ValidateNested()
    readonly contact: CreateContactDto;

    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateAddressDto)
    @ValidateNested()
    readonly address: CreateAddressDto;
}

export class CreatePackageDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateDimensionsDto)
    @ValidateNested()
    readonly dimensions: CreateDimensionsDto;

    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateGrossWeightDto)
    @ValidateNested()
    readonly grossWeight: CreateGrossWeightDto;
}

export class CreateShipmentObjectDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateQuoteDto)
    @ValidateNested()
    readonly quote: CreateQuoteDto;

    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateOriginDto)
    @ValidateNested()
    readonly origin: CreateOriginDto;

    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateDestinationDto)
    @ValidateNested()
    readonly destination: CreateDestinationDto;

    @IsNotEmpty()
    @IsObject()
    @Type(() => CreatePackageDto)
    @ValidateNested()
    readonly package: CreatePackageDto;
}

export class CreateShipmentDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => CreateShipmentObjectDto)
    @ValidateNested()
    readonly data: CreateShipmentObjectDto;
}
