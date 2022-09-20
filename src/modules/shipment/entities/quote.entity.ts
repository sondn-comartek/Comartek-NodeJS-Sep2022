import { Prop , Schema , SchemaFactory } from '@nestjs/mongoose'

import { Document , Types } from 'mongoose' ;


@Schema()
export class Quote extends Document {
    @Prop()
    amount : number 
}

export const QuoteSchema = SchemaFactory.createForClass(Quote) 


