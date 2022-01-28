import { Schema, model, Document } from 'mongoose';

export interface student_attendance_document extends Document {
    date: Date;
    hostel: String;
    students: [
        {
            student_id: String;
            present: Boolean;
            remarks: String;
        }
    ];
}

const schema_attandance = new Schema({
    date: Date,
    hostel: String,
    students: [
        {
            student_id: String,
            present: Boolean,
            remarks: String
        }
    ]
});

export const Student_hostel_attendance_Model = model<student_attendance_document>('Student_hostel_attandance', schema_attandance);
