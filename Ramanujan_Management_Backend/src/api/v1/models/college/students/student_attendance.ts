import { Document, Schema, model } from 'mongoose';

export interface student_attendance extends Document {
    date: Date;
    class: Number;
    sec: String;
    department: String;
    students: [
        {
            student_id: String;
            present: Boolean;
        }
    ];
}

const schema_attendance = new Schema({
    date: Date,
    class: Number,
    sec: String,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    students: [
        {
            student_id: {
                type: Schema.Types.ObjectId,
                ref: 'StudentCollege'
            },
            present: Boolean
        }
    ]
});

export const Student_attendance_Model = model<student_attendance>('Student_Attendance', schema_attendance);
