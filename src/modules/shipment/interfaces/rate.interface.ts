import { Document } from 'mongoose' ;

export interface Rate extends Document {
    readonly weight: number ,
    readonly price: number
} 