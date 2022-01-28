import { Document, Schema, model } from 'mongoose';

export interface expenditure extends Document {
    Particular: String;
    Date: Date;
    Amount: Number;
    Remark: String;
    casemde: Number;
}
const schema_expen = new Schema({
    Particular: String,
    Date: Date,
    Amount: Number,
    Remark: String,
    casemde: Number
});

const Expenditure = model<expenditure>('expenditure', schema_expen);

exports.Expenditure = Expenditure;
