import mongoose, { Document } from 'mongoose';
import { IUserBase } from '../../../interfaces';

export interface StudentDocumentCoaching extends IUserBase, Document {
    DOB: Date;
    snap_shot: String;
    rollNo: String;
    admissionNo: String;
    Father_Name: String;
    Mother_Name: String;
    Caste: Number;
    Religion: Number;
    Date_of_admission: Date;
    session: Number;
    session_start_date: Date;
    session_end_date: Date;
    stream: Number;
    class: Number;
    section: Number;
    id_prof: String;
    L_Percentage: Number;
    special_subjects: Array<number>;
    admissionFees: Number;
    programFees: Number;
    ExamFees: Number;
    other: Number;
    Consession: Number;
    paid_amount: Number;
    payment_method: Number;
    payment_mode: Number;
    receipt_number: Number;
    installments: [
        {
            month: Number;
            year: Number;
            due_date: Date;
            amount: Number;
        }
    ];
}

const student = new mongoose.Schema({
    DOB: Date,
    snap_shot: String,
    rollNo: String,
    admissionNo: String,
    Father_Name: String,
    Mother_Name: String,
    Caste: Number,
    Religion: Number,
    Date_of_admission: Date,
    session: Number,
    session_start_date: Date,
    session_end_date: Date,
    stream: Number,
    class: Number,
    section: Number,
    id_prof: String,
    L_Percentage: Number,
    special_subjects: Array,
    admissionFees: Number,
    programFees: Number,
    ExamFees: Number,
    other: Number,
    Consession: Number,
    paid_amount: Number,
    payment_method: Number,
    payment_mode: Number,
    receipt_number: Number,
    installments: [
        {
            month: Number,
            year: Number,
            due_date: Date,
            amount: Number
        }
    ]
});
export const StudentModelCoaching = mongoose.model<StudentDocumentCoaching>('StudentCoaching', student);
