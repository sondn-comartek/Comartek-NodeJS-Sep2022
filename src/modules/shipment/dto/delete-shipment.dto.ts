import { GetShipmentDto } from './get-shipment.dto';
import {IsString , IsNotEmpty } from 'class-validator'
export class DeteleShipmentDto {
    @IsString()
    @IsNotEmpty()
    ref : string
}