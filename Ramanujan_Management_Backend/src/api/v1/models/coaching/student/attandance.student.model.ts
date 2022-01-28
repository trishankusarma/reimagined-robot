import { Document, Schema, model } from 'mongoose';

export interface student_attandance_document extends Document {
    date: Date;
    Class: Number;
    sec: Number;
    students: [
        {
            student_id: String;
            present: Boolean;
        }
    ];
}

const schema_attandance = new Schema({
    date: Date,
    Class: Number,
    sec: Number,
    students: [
        {
            student_id: String,
            present: Boolean
        }
    ]
});

export const student_attandance_model = model<student_attandance_document>('coaching_attandance_data', schema_attandance);
