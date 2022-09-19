import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsObject, ValidateNested } from "class-validator"

class DeleteShipmentObjectDto {
    @IsNotEmpty()
    @IsString()
    readonly ref: string
}

export class DeleteShipmentDto {
    @IsNotEmpty()
    @IsObject()
    @Type(() => DeleteShipmentObjectDto)
    @ValidateNested()
    readonly data: DeleteShipmentObjectDto;
}