import { IsString , IsNotEmpty , IsNotEmptyObject } from 'class-validator' ;

export class GetShipmentDto {
    @IsString()
    @IsNotEmpty()
    ref : string
}