import { Schema, Document, model } from 'mongoose';

export interface FeeInstanceDocument extends Document {
    department: string;
    student: string;
    payment: string;
    date: String;
    reciept: Number;
    instance: {
        Amount_paid: Number;
        Paid_Admission_Amount: Number;
        Total_Paid_Amount: Number;
        BalanceAdmissionAmount: Number;
        Total_Paid: Number;
        Balance_left: Number;
        Payment_Type: Number;
        Pay_Now: Number;
        Monthly: Number;
    };
}

const FeeInstance_Schema = new Schema(
    {
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: 'StudentCollege'
        },
        studentHostel: {
            type: Schema.Types.ObjectId,
            ref: 'StudentCollege'
        },
        payment: {
            type: Schema.Types.ObjectId,
            ref: 'FreePayment'
        },
        hostel: {
            type: Boolean,
            default: 0
        },
        date: String,
        reciept: Number,
        instance: {
            Amount_paid: Number,
            admissionFee: Number,
            programeFee: Number,
            Paid_Admission_Amount: Number,
            BalanceAdmissionAmount: Number,
            Total_Paid: Number,
            Balance_left: Number,
            Payment_Type: String,
            Monthly: Number
        }
    },
    {
        timestamps: true
    }
);

export const FeeInstanceModel = model<FeeInstanceDocument>('FeeInstance', FeeInstance_Schema);
