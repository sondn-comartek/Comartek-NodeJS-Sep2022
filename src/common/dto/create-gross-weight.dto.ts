import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { WeightUnitsEnum } from '../enums/weight-unit.enum';

export class CreateGrossWeightDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly amount: number;

  @IsNotEmpty()
  @IsEnum(WeightUnitsEnum, {
    message: "Weight unit must be 'kg' or 'g'",
  })
  readonly unit: string;
}
