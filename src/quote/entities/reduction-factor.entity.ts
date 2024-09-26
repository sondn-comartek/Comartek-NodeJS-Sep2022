import * as mongoose from 'mongoose';

export const ReductionFactorSchema = new mongoose.Schema({
    reduction_factor_name: { type: String, required: true },
    description: { type: String, required: true },
    is_occur: { type: Boolean, required: true }
});

export class ReductionFactor {
    reduction_factor_name: string;
    description: string;
    is_occur: boolean
}
