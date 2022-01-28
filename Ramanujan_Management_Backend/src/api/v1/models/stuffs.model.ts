import { Schema, Document, model } from 'mongoose';

export interface stuff extends Document {
    snap_shot: String;
    idNo: String;
    biometric_code: String;
    DOB: Date;
    name: String;
    gender: Number;
    address: String;
    mobileNo: Number;
    email: String;
    joining_Date: Date;
    designation: String;
    maritial_Status: Number;
    blood_grp: String;
    subject: String;
    salary: Number;
    absent_penalty: Number;
    duty_days: Number;
    leave_application_date: Array<Date>;
    leave_application_name: Array<String>;
    leave_application_reason: Array<String>;
}

const stuff_schema = new Schema({
    snap_shot: String,
    idNo: String,
    biometric_code: String,
    DOB: Date,
    name: String,
    gender: Number,
    address: String,
    mobileNo: Number,
    email: String,
    joining_Date: Date,
    designation: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    maritial_Status: Number,
    blood_grp: String,
    subject: String,
    salary: Number,
    absent_penalty: Number,
    duty_days: Number,
    leave_application_date: Array,
    leave_application_name: Array,
    leave_application_reason: Array
});

export const StuffModel = model<stuff>('Stuff', stuff_schema);
