import {
    IsEmail ,
    IsISO31661Alpha2 ,
    IsNumber ,
    IsString ,
    IsNotEmpty ,
    ValidateNested ,
    IsNotEmptyObject
} from 'class-validator'

import { Type } from 'class-transformer'

import { Unit } from 'convert-units';

export class OriginContact {
    @IsString()
    @IsNotEmpty()
    name : string 
    @IsEmail()
    @IsNotEmpty()
    email : string 
    @IsNotEmpty()
    phone : number 
}

export class OriginAddresss {
    @IsISO31661Alpha2()
    @IsNotEmpty()
    country_code : string
    @IsString()
    @IsNotEmpty()
    locality : string 
    @IsNotEmpty()
    postal_code : string 
    @IsString()
    @IsNotEmpty() 
    address_line1 : string 
}

export class DestinationContact {
    @IsString()
    @IsNotEmpty()
    name : string 
    @IsEmail()
    @IsNotEmpty()
    email : string 
    @IsNotEmpty()
    phone : number
}


export class DestinationAddress {
    @IsISO31661Alpha2()
    @IsNotEmpty()
    country_code : string 
    @IsString()
    @IsNotEmpty()
    locality : string 
    @IsNotEmpty()
    postal_code : number
    @IsString()
    @IsNotEmpty()
    address_line1 : string 
}
export class PackageDimensions{
    @IsNumber()
    @IsNotEmpty()
    height : number 
    @IsNumber()
    @IsNotEmpty()
    width : number 
    @IsNumber()
    @IsNotEmpty()
    length : number 
    @IsString()
    @IsNotEmpty()
    unit : Unit
}

export class PackageGrossWeight{
    @IsNumber()
    @IsNotEmpty()
    amount : number 
    @IsString()
    @IsNotEmpty()
    unit : Unit
}

export class Origin {
    @Type( () => OriginContact )
    @ValidateNested() 
    contact : OriginContact
    @Type( () => OriginAddresss )
    @ValidateNested() 
    address : OriginAddresss
}

export class Destination {
    @Type( () => DestinationContact )
    @ValidateNested() 
    contact : DestinationContact
    @Type( () => DestinationAddress )
    @ValidateNested() 
    address : DestinationAddress
}

export class Package {
    @Type( () => PackageDimensions )
    @ValidateNested() 
    dimensions : PackageDimensions 
    @Type( () => PackageGrossWeight )
    @ValidateNested()
    grossWeight : PackageGrossWeight
}

export class DataQuote {
    @IsNotEmptyObject()
    @Type( () => Origin )
    @ValidateNested()
    origin : Origin 

    @IsNotEmptyObject()
    @Type( () => Destination )
    @ValidateNested()
    destination : Destination

    @IsNotEmptyObject()
    @Type ( () => Package)
    @ValidateNested()
    package : Package
}    

export class GetQuoteDto {
    @IsNotEmptyObject()
    @Type( () => DataQuote )
    @ValidateNested() 
    data : DataQuote
}