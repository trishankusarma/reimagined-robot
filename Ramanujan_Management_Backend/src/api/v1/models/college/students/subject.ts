import { Document, Schema, model } from 'mongoose';

export interface subject extends Document {
    type: Number;
    subjects: [];
}
const schema_sub = new Schema({
    type: Number,
    subjects: []
});

const sub_model = model<subject>('Subject', schema_sub);

exports.sub_model = sub_model;
