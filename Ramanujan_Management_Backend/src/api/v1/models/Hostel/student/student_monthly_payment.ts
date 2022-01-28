import { Document, Schema, model } from 'mongoose';

export interface student_monthly_payment_document extends Document {
    student_hostel: String;
    Payment_Date: Date;
    Monthly_Fees: Number;
    Pending_Fees: Number;
    Late_Fine: Number;
    Other_Penalty: Number;
    Other_Fees: Number;
    Concession: Number;
    Payable: Number;
    Admission_Balance: Number;
    Paid_Amount: Number;
    Year: Number;
    Month: Number;
    Payment_Type: Number;
    Payment_Mode: Number;
}

const schema_hostel_payment = new Schema({
    student_hostel: String,
    Payment_Date: Date,
    Monthly_Fees: Number,
    Pending_Fees: Number,
    Late_Fine: Number,
    Other_Penalty: Number,
    Other_Fees: Number,
    Concession: Number,
    Payable: Number,
    Admission_Balance: Number,
    Paid_Amount: Number,
    Year: Number,
    Month: Number,
    Payment_Type: Number,
    Payment_Mode: Number
});

export const Student_monthly_payment_Model = model<student_monthly_payment_document>('Student_monthly_hostel_payment', schema_hostel_payment);
