import { Document, Schema, model } from 'mongoose';

export interface stuff_attendance extends Document {
    date: Date;
    department: String;
    stuffs: [
        {
            stuff_id: String;
            present: Boolean;
        }
    ];
}

const schema_attendance = new Schema({
    date: Date,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    stuffs: [
        {
            stuff_id: {
                type: Schema.Types.ObjectId,
                ref: 'Stuff'
            },
            present: Boolean
        }
    ]
});

export const Stuff_attendance_Model = model<stuff_attendance>('Stuff_Attendance', schema_attendance);
