import { Document, Schema, model } from 'mongoose';

export interface coaching_expences_document extends Document {
    date: Date;
    particular: String;
    Amount: Number;
    Remarks: String;
}
const schema_expences = new Schema({
    date: Date,
    particular: String,
    Amount: Number,
    Remarks: String
});

export const coaching_expences_model = model<coaching_expences_document>('Coaching_expence', schema_expences);
