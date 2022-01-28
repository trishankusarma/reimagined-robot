import { Schema, Document, model } from 'mongoose';

export interface FeePaymentDocument extends Document {
    department: string;
    student: string;
    otherPayment: object;
    previousPayment: object;
}

const FeePayment_Schema = new Schema({
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'StudentCollege'
    },
    hostel: {
        type: Boolean,
        default: 0
    },
    otherPayment: [
        {
            instance: {
                type: Schema.Types.ObjectId,
                ref: 'FeeInstance'
            },
            date: String,
            particular: String,
            amount: Number,
            paymentMode: String
        }
    ],
    previousPayment: [
        {
            instance: {
                type: Schema.Types.ObjectId,
                ref: 'FeeInstance'
            },
            date: String,
            particular: String,
            amount: Number,
            paymentMode: String
        }
    ]
});

export const FeePaymentModel = model<FeePaymentDocument>('FreePayment', FeePayment_Schema);
