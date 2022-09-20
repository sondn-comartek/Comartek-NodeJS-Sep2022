import { Document } from 'mongoose' ;

export interface Rate extends Document {
    weight?: number ,
    price?: number
} 