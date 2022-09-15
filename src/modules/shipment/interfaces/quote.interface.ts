import  { Document } from 'mongoose' ;

export interface Quote extends Document {
    readonly amount: number ,
}