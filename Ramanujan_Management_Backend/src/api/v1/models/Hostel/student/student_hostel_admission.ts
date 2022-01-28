import mongoose, { Document, Schema, model } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface student_hostel_admission_document extends Document {
    hostel: String;
    room: number;
    student: String;
    department: String;
    enrollment_no: string;
    Admission_Date: Date;
    admissionFee: number;
    programFees: number;
    ExamFees: number;
    other: number;
    totalFee: number;
    Consession: number;
    paidAmount: number;
    payment_method: number;
    payment_mode: number;
    receipt_number: number;
    admissionPaid: number;
    receiptNo: number;
    Year: number;
    month: number;
    extraPay: number;
}
const schema_admission = new Schema(
    {
        hostel: String, //
        room: Number, //
        extraPay: {
            type: Number,
            default: 0
        }, //
        student: {
            type: Schema.Types.ObjectId,
            ref: 'StudentCollege'
        },
        enrollment_no: String, //
        Admission_Date: Date, //
        admissionFee: Number, //
        admissionPaid: Number, //
        admissionPaidPermatent: Number,
        programFees: Number, //
        examFee: {
            type: Number,
            default: 0
        }, //
        otherFee: Number, //
        concession: Number, //
        totalFee: Number, //
        paidAmount: Number, //
        receiptNo: {
            type: Number
        },
        department: String,
        payment_mode: String, //
        Year: Number,
        month: Number
    },
    {
        timestamps: true
    }
);
schema_admission.plugin(AutoIncrement, { inc_field: 'receiptNo ' });
export const Student_hostel_admission_Model = model<student_hostel_admission_document>('Student_hostel_admission', schema_admission);
