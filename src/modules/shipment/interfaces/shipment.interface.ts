import { Document } from 'mongoose';
import { Unit } from 'convert-units';

export interface Shipment extends Document {
    ref?: string ,
    origin?: {
        contact?: {
            name?: string,
            email?: string,
            phone?: number
        },
        address?: {
            country_code?: string,
            locality?: string,
            postal_code?: string,
            address_line1?: string
        }
    },
    destination?: {
        contact?: {
            name?: string,
            email?: string,
            phone?: number
        },
        address?: {
            country_code?: string,
            locality?: string,
            postal_code?: string,
            address_line1?: string
        }
    },
    package?: {
        dimensions?: {
            height?: number,
            width?: number,
            length?: number,
            unit?: Unit
        },
        grossWeight?: {
            amount?: number,
            unit?: Unit
        }
    },
    cost? : number  ,
    create_at? : Date ,
    status? : 'pending' | 'confimed' | 'delivery' | 'completed' | 'failed',
    number? : number 
} 