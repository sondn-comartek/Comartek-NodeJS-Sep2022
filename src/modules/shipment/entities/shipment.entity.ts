import { Schema , Prop , SchemaFactory } from '@nestjs/mongoose' ;

import { Document , Types } from 'mongoose' ;

import { Type } from 'class-transformer' ;

import { ValidateNested  , IsString , IsNumber  , IsDate } from 'class-validator';

import { Origin , Destination , Package } from '../dto/get-quote.dto' ;


@Schema()
export class Shipment extends Document {
    @IsString()
    @Prop({ isRequired : true})
    ref : string 

    @Type( () => Origin)
    @ValidateNested()
    @Prop({isRequired : true})
    origin : Origin

    @Type( () => Destination)
    @Prop({isRequired : true})
    @ValidateNested()
    destination : Destination

    @Type( () => Package)
    @ValidateNested()
    @Prop({isRequired : true})
    package : Package

    @Prop({isRequired : true })
    @IsNumber()
    cost : number
    
    @IsDate()
    @Prop({isRequired : true })
    create_at : Date
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment) ;



// export const ShipmentSchema = SchemaFactory.createForClass(Shipment) ;


// {

//     "ref": "__REFERENCE_NUMBER__", // Random number in 10 character
    
//     "created_at": "2015-05-13T07:00:08+0000",
    
//     "cost": 10.00 // USD
    
//     }