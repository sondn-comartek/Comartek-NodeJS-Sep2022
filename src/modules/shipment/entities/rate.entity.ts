import { Schema , Prop , SchemaFactory } from '@nestjs/mongoose' ;

import { Document , Types } from 'mongoose' ;

@Schema()

export class Rate extends Document {
    @Prop({ unique : true}) 
    weight : number  ;
    @Prop()
    price : number  ;
   
}

export const RateSchema = SchemaFactory.createForClass(Rate) ;