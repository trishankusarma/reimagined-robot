import { Schema, model, Document } from 'mongoose';

export interface salary extends Document {
    stuff_id: String;
    Basic_pay: Number;
    DA: Number;
    HRA: Number;
    conveyance: Number;
    Other_allowance: Number;
    Gross_salary: Number;
    PF: Number;
    ESI: Number;
    Loan_Education: Number;
    Professional_Tax: Number;
    Absent_panalty: Number;
    Advance_salary: Number;
    TDS_IT: Number;
    Net_Salary: Number;
    Payment_mode: Number;
    Date: String;
}

const schema_salary = new Schema({
    stuff_id: String,
    Basic_pay: Number,
    DA: Number,
    HRA: Number,
    conveyance: Number,
    Other_allowance: Number,
    Gross_salary: Number,
    PF: Number,
    ESI: Number,
    Loan_Education: Number,
    Professional_Tax: Number,
    Absent_panalty: Number,
    Advance_salary: Number,
    TDS_IT: Number,
    Net_Salary: Number,
    Payment_mode: Number,
    Date: String
});

const Salary = model<salary>('Stuff_salary', schema_salary);

exports.Salary = Salary;
