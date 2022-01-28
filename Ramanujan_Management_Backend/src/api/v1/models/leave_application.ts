import { Document, Schema, model } from 'mongoose';

export interface LeaveApplication extends Document {
    From_Date: Date;
    To_date: Date;
    reason: string;
    modelOf: string;
    id: string;
}
const schema_leave = new Schema({
    From_Date: Date,
    To_date: Date,
    reason: String,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'modelOf'
    },
    modelOf: {
        type: String,
        required: true,
        enum: ['StudentCollege', 'Stuff']
    }
});

export const Leave_Application_Model = model<LeaveApplication>('Leave_Application', schema_leave);
