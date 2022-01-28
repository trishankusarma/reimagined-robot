import { Document, Schema, model } from 'mongoose';

export interface hostel_expences_document extends Document {
    hostel: String;
    entry_date: Date;
    particular: String;
    amount: Number;
    remarks: String;
    payment_mode: Number;
}
const schema_expences = new Schema({
    hostel: String,
    entry_date: Date,
    particular: String,
    amount: Number,
    remarks: String,
    payment_mode: Number
});

export const Hostel_expences_model = model<hostel_expences_document>('Hostel_expence', schema_expences);
