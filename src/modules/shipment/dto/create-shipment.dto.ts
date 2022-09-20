import { Origin , Destination , Package } from './get-quote.dto';
import { Type } from 'class-transformer' ;
import { IsString , ValidateNested } from'class-validator'

export class QuoteIdDto {
    @IsString()
    id : string
}

export class CreateShipmentDto {
    @Type( () => QuoteIdDto )
    @ValidateNested()
    quote : QuoteIdDto
    
    @Type( () => Origin )
    @ValidateNested()
    origin : Origin 

    @Type( () => Destination )
    @ValidateNested()
    destination : Destination 
    
    @Type( () => Package )
    @ValidateNested()
    package : Package
}