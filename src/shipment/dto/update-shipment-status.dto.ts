import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ShipmentStatus } from "../enums/shipment-status.enum";

export class UpdateShipmentStatusDto {
  @IsString()
  readonly status: string;
}
