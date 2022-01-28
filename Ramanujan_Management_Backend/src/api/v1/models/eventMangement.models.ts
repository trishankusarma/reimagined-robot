import { Schema, Document, model } from 'mongoose';

export interface EventMangementDocument extends Document {
    particulars: string;
    amount: number;
    date: string;
    paymentMode: string;
    remarks: string;
    department: string;
}

const EventMangement_Schema = new Schema({
    event: String,
    organizer: String,
    date: Date,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    budgetAllocated: Number,
    budgetUsed: Number,
    remarks: String
});

export const EventMangementModel = model<EventMangementDocument>('EventMangement', EventMangement_Schema);
