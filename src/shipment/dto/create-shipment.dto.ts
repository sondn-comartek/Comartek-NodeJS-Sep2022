import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsObject,
  Length,
  ValidateNested,
} from 'class-validator';

import { CreateDestinationDto } from '../../common/dto/create-destination.dto';
import { CreateOriginDto, CreatePackageDto } from '../../common/dto';

export class CreateShipmentDto {
  @IsNotEmpty()
  @IsNumberString()
  // Required length: 10 characters of number
  @Length(10, 10, {
    message: 'Quote id (ref) must be equal to 10 characters of number',
  })
  readonly ref: string;

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
