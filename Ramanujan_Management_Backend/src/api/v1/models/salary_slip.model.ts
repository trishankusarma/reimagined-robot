import { Schema, Document, model } from 'mongoose';

export interface SalarySlipDocument extends Document {
    stuff_id: string;
    basicPay: number;
    department: string;
    DA: number;
    HRA: number;
    conveyance: number;
    otherAllowance: number;
    grossSalary: number;
    PF: number;
    ESI: number;
    loanDeduction: number;
    professionalTax: number;
    absentPenalty: number;
    advancedSalary: number;
    TDSIT: number;
    netSalary: number;
    paymentMethod: string;
    year: number;
    month: String;
}

const SalarySlipModel_Schema = new Schema(
    {
        stuff_id: {
            type: Schema.Types.ObjectId,
            ref: 'Stuff'
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        },
        year: Number,
        month: String,
        basicPay: Number,
        DA: Number,
        HRA: Number,
        conveyance: Number,
        otherAllowance: Number,
        grossSalary: Number,
        PF: Number,
        ESI: Number,
        loanDeduction: Number,
        professionalTax: Number,
        absentPenalty: Number,
        advancedSalary: Number,
        TDSIT: Number,
        netSalary: Number,
        paymentMethod: String
    },
    {
        timestamps: true
    }
);

export const SalarySlipModel = model<SalarySlipDocument>('Salary_Slip', SalarySlipModel_Schema);
