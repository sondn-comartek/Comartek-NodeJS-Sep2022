import * as mongoose from 'mongoose';

export const QuoteSchema = new mongoose.Schema({
    data: [
        {
            id: { type: String, required: true },
            weight: { type: String, required: true },
            unit: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ]
});

export class Quote {
    data: [
        {
            id: string,
            weight: string,
            unit: string,
            price: number
        }
    ]
}
