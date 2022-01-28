import { Document, Schema, model } from 'mongoose';

export interface stuff_attandance_document extends Document {
    date: Date;
    stuff: [
        {
            stuff_id: String;
            status: Boolean;
        }
    ];
}

const schema_attandance = new Schema({
    date: Date,
    stuff: [
        {
            stuff_id: String,
            status: Boolean
        }
    ]
});

export const stuff_attandance_model = model<stuff_attandance_document>('coaching_attandance_stuff_data', schema_attandance);
