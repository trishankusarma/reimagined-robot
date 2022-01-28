import { Schema, Document, model } from 'mongoose';

export interface CashBook extends Document {
    date: Date;

    opening_cash_in_bank: {
        type: Number;
        default: 0;
    };
    opening_cash_in_hand: {
        type: Number;
        default: 0;
    };

    receipts: {
        type: Number;
        default: 0;
    };
    payments: {
        type: Number;
        default: 0;
    };
    bankTransfer: {
        type: Number;
        default: 0;
    };

    department: String;

    particular: String;
    remarks: String;

    closing_cash_in_bank: {
        type: Number;
        default: 0;
    };
    closing_cash_in_hand: {
        type: Number;
        default: 0;
    };
}

const CashBook_Schema = new Schema({
    date: Date,

    opening_cash_in_bank: {
        type: Number,
        default: 0
    },
    opening_cash_in_hand: {
        type: Number,
        default: 0
    },

    receipts: {
        type: Number,
        default: 0
    },
    payments: {
        type: Number,
        default: 0
    },
    bankTransfer: {
        type: Number,
        default: 0
    },

    department: String,

    particular: String,
    remarks: String,

    closing_cash_in_bank: {
        type: Number,
        default: 0
    },
    closing_cash_in_hand: {
        type: Number,
        default: 0
    }
});

export const CashBookModel = model<CashBook>('CashBook', CashBook_Schema);
