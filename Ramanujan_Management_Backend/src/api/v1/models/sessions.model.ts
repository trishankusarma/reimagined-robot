import { Schema, Document, model } from 'mongoose';

export interface SessionDocument extends Document {
    session: String;
    admissionFees: Number;
    programFees: Number;
    monthDuration: Number;
    department: String;
}

const Session_Schema = new Schema({
    session: String,
    admissionFees: Number,
    programFees: Number,
    monthDuration: Number,
    department: String
});

export const SessionModel = model<SessionDocument>('Session', Session_Schema);
