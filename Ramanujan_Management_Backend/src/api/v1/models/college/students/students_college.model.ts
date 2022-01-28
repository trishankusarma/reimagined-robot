import mongoose, { Document } from 'mongoose';
import { IUserBase } from '../../../interfaces';

export interface StudentDocumentCollege extends IUserBase, Document {
    DOB: Date;
    snap_shot: String;
    rollNo: Number;
    admissionNo: String;
    Father_Name: String;
    motherName: String;
    Caste: Number;
    Religion: Number;
    Date_of_admission: Date;
    session: Number;
    session_start_date: Date;
    session_end_date: Date;
    stream: String;
    class: Number;
    section: Number;
    IDProof: String;
    L_Percentage: Number;
    special_subjects: Array<number>;
    admissionFee: Number;
    programFees: Number;
    ExamFees: Number;
    other: Number;
    Consession: Number;
    paid_amount: Number;
    payment_method: Number;
    payment_mode: Number;
    receipt_number: Number;
    admissionPaid: Number;
    installments: [
        {
            month: Number;
            year: Number;
            due_date: Date;
            amount: Number;
        }
    ];
}

const student = new mongoose.Schema(
    {
        snap_shot: String,
        name: String,
        email: String,
        admissionNo: String,
        rollNo: Number,
        gender: Number,
        paymentMode: String,
        caste: Number,
        religion: Number,
        extraPay: {
            type: Number,
            default: 0
        },
        stream: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        },

        installments: [
            {
                month: Number,
                year: Number,
                due_date: Date,
                amount: Number
            }
        ],
        standard: String,
        specialSubject: Array,
        paymentMethod: String,
        session: String,
        bioCode: String,
        DOB: Date,
        address: String,
        mobileNo: Number,
        gaurdian: String,
        motherName: String,
        sessionStart: Date,
        sessionEnd: Date,
        section: String,
        image: String,
        IDProof: String,
        lastPercentage: Number,
        admissionFee: Number,
        admissionPaid: Number,
        programFee: Number,
        examFee: Number,
        otherFee: Number,
        concession: String,
        totalFee: Number,
        paidAmount: Number,
        paidAmountPermatent: Number,
        receiptNo: Number
    },
    {
        timestamps: true
    }
);

export const StudentModelCollege = mongoose.model<StudentDocumentCollege>('StudentCollege', student);
