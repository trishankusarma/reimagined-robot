import { Schema, Document, model } from 'mongoose';

export interface ExpenditureDocument extends Document {
    particulars: string;
    amount: number;
    date: string;
    paymentMode: string;
    remarks: string;
    department: string;
}

const Expenditure_Schema = new Schema({
    particulars: String,
    date: String,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    amount: Number,
    remarks: String,
    paymentMode: String
});

export const ExpenditureModel = model<ExpenditureDocument>('Expenditure', Expenditure_Schema);
