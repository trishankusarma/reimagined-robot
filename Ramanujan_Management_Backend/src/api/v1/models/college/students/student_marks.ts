import { Document, Schema, model } from 'mongoose';

export interface student_marks_document extends Document {
    Exam: String;
    Session: String;
    Class: Number;
    Section: String;
    Student_id: Number;
    subjects: [
        {
            name: String;
            marks: Number;
            Pass_Mark: Number;
            Mark_Obtain: Number;
            Is_Fourth: Boolean;
            remarks: String;
        }
    ];
}

const schema_marks = new Schema({
    Exam: String,
    Session: String,
    Class: Number,
    Section: String,
    Student_id: {
        type: Schema.Types.ObjectId,
        ref: 'StudentCollege'
    },
    subjects: [
        {
            name: String,
            marks: Number,
            Pass_Mark: Number,
            Mark_Obtain: Number,
            Is_Fourth: Boolean,
            remarks: String
        }
    ]
});

export const Student_marks_Model = model<student_marks_document>('student_mark', schema_marks);
