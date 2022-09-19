import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested, IsString, IsNumber } from "class-validator";
import { CreateOriginDto, CreateDestinationDto, CreatePackageDto } from '../../shipment/dto/create-shipment.dto';

export class GetQuoteObjectDto {
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

export class GetQuoteDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => GetQuoteObjectDto)
    @ValidateNested()
    readonly data: GetQuoteObjectDto;
}