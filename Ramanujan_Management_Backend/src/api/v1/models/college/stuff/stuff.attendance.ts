import mongoose, { Document } from 'mongoose';

export interface stuff_attendance extends Document {
    date: Date;
    teacher: [
        {
            stuff_id: String;
            present: Boolean;
        }
    ];
}

const attendance = new mongoose.Schema({
    date: Date,
    teacher: [
        {
            stuff_id: String,
            present: Boolean
        }
    ]
});

const Stuff_attendance = mongoose.model<stuff_attendance>('Stuff_Attendance', attendance);

exports.Stuff_attendance = Stuff_attendance;
