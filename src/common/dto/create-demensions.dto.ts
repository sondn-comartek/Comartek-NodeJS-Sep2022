import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateDimensionsDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly height: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly width: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly length: number;

  @IsNotEmpty()
  @IsString()
  readonly unit: string;
}
