import { Document, Schema, model } from 'mongoose';

export interface coaching_stuff_document extends Document {
    snap_shot: String;
    id_no: String;
    biometric_code: String;
    DOB: Date;
    name: String;
    gender: Number;
    address: String;
    mobileNo: Number;
    email: String;
    joining_Date: Date;
    designation: Number;
    maritial_Status: Number;
    blood_grp: Number;
    leave_application_date: Array<Date>;
    leave_application_name: Array<String>;
    leave_application_reason: Array<String>;
}

const coaching_schema = new Schema({
    snap_shot: String,
    id_no: String,
    biometric_code: String,
    DOB: Date,
    name: String,
    gender: Number,
    address: String,
    mobileNo: Number,
    email: String,
    joining_Date: Date,
    designation: Number,
    maritial_Status: Number,
    blood_grp: Number,
    leave_application_date: Array,
    leave_application_name: Array,
    leave_application_reason: Array
});

export const Coaching_stuff_model = model<coaching_stuff_document>('Coaching_stuff', coaching_schema);
