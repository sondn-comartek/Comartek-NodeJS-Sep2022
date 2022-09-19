import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsObject, ValidateNested } from "class-validator"
import { ShipmentStatus } from "../shipment.status";

class UpdateShipmentStatusObjectDto {
    @IsNotEmpty()
    @IsString()
    readonly ref: string;

    @IsNotEmpty()
    @IsString()
    readonly status: ShipmentStatus;
}

export class UpdateShipmentStatusDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => UpdateShipmentStatusObjectDto)
    @ValidateNested()
    readonly data: UpdateShipmentStatusObjectDto;
}