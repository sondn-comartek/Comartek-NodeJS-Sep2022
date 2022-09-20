import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { CreateDimensionsDto } from './create-demensions.dto';
import { CreateGrossWeightDto } from './create-gross-weight.dto';

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
