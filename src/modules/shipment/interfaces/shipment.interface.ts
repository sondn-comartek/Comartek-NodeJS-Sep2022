import { Document } from 'mongoose';

export interface Shipment extends Document {
    ref: string ,
    origin: {
        contact: {
            name: string,
            email: string,
            phone: number
        },
        address: {
            country_code: string,
            locality: string,
            postal_code: string,
            address_line1: string
        }
    },
    destination: {
        contact: {
            name: string,
            email: string,
            phone: number
        },
        address: {
            country_code: string,
            locality: string,
            postal_code: string,
            address_line1: string
        }
    },
    package: {
        dimensions: {
            height: number,
            width: number,
            length: number,
            unit: string
        },
        grossWeight: {
            amount: number,
            unit: string
        }
    },
    cost : number  ,
    create_at : Date
} 