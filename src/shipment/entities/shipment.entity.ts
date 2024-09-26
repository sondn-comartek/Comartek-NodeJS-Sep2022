import * as mongoose from 'mongoose';
import { ShipmentStatus } from '../shipment.status';

export const ShipmentSchema = new mongoose.Schema({
    ref: { type: String, required: true },
    number: { type: Number, required: true },
    data: {
        origin: {
            contact: {
                name: { type: String, required: true },
                email: { type: String, required: true },
                phone: { type: String, required: true },
            },
            address: {
                country_code: { type: String, required: true },
                locality: { type: String, required: true },
                postal_code: { type: String, required: true },
                address_line1: { type: String, required: true },
            }
        },
        destination: {
            contact: {
                name: { type: String, required: true },
                email: { type: String, required: true },
                phone: { type: String, required: true },
            },
            address: {
                country_code: { type: String, required: true },
                locality: { type: String, required: true },
                postal_code: { type: String, required: true },
                address_line1: { type: String, required: true }
            }
        },
        package: {
            dimensions: {
                height: { type: Number, required: true },
                width: { type: Number, required: true },
                length: { type: Number, required: true },
                unit: { type: String, required: true }
            },
            grossWeight: {
                amount: { type: Number, required: true },
                unit: { type: String, required: true }
            }
        }
    },
    status: {type: String, required: true},
    cost: { type: Number, required: true },
    created_at: { type: Date, required: true }
});

export class Shipment {
    ref: string;
    number: number;
    data: {
        origin: {
            contact: {
                name: string,
                email: string,
                phone: string,
            },
            address: {
                country_code: string,
                locality: string,
                postal_code: string,
                address_line1: string,
            }
        },
        destination: {
            contact: {
                name: string,
                email: string,
                phone: string,
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
        }
    };
    status: ShipmentStatus;
    cost: number;
    created_at: Date
}
