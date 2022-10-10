import { Document } from 'mongoose';

export interface Migration extends Document {
    readonly key: string;
    readonly createdAt: Date;
}
