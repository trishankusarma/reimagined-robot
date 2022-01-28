import { Document, Schema, model } from 'mongoose';

export interface payment extends Document {
    student: String;
    programeFees: Number;
    AdmissionFees: Number;
    examFees: Number;
    otherFees: Number;
    monthlyFees: Number;
    conssion: Number;
    extraFees: Number;
    Paid_Amount: Number;
    BalanceAmount: Number;
    admissionBalanceAmount: Number;
    pay_now: Number;
    reciept: Number;
    paymentDate: Date;
    paymentType: Number;
    paymentMode: Number;
}

const schema_payment = new Schema({
    student: String,
    programeFees: Number,
    AdmissionFees: Number,
    examFees: Number,
    otherFees: Number,
    monthlyFees: Number,
    conssion: Number,
    extraFees: Number,
    Paid_Amount: Number,
    BalanceAmount: Number,
    admissionBalanceAmount: Number,
    pay_now: Number,
    reciept: Number,
    paymentDate: Date,
    paymentType: Number,
    paymentMode: Number
});

const Payment = model<payment>('stuff_payment', schema_payment);
exports.Payment = Payment;
