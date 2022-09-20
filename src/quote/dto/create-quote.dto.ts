import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import {
  CreateDestinationDto,
  CreateOriginDto,
  CreatePackageDto,
} from '../../common/dto';

export class CreateQuoteDto {
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
