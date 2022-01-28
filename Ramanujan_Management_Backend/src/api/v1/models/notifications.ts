import { Document, Schema, model } from 'mongoose';

export interface notifications extends Document {
    message: string;
    title: string;
    toModel: string;
    student_or_stuff: number;
    id: string;
}

const schema_not = new Schema({
    message: String,
    title: String,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    toModel: {
        type: String,
        required: true,
        enum: ['StudentCollege', 'Stuff']
    },
    student_or_stuff: Number,
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'toModel'
    }
});

// schema_not.virtual('to', {
//     ref: (doc: notifications) => doc.toModel, // The model to use, conditional on the doc
//     localField: 'id', // Find people or organizations where `localField`
//     foreignField: '_id', // is equal to `foreignField`
//     justOne: true // and return only one
// });

export const NotificationModel = model<notifications>('Notification', schema_not);
