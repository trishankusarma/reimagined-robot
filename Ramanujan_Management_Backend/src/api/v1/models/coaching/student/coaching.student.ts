import { Document, Schema, model } from 'mongoose';

export interface coaching_student_document extends Document {
    snap_shot: String;
    Admission_No: Number;
    Batch_Name: String;
    Program: Number;
    Full_Name: String;
    Father_Guardian_Name: String;
    Mother_Name: String;
    Date_Of_Birth: Date;
    Gender: Number;
    Blood_Group: String;
    Caste: Number;
    Nationality: Number;
    Address: String;
    City: String;
    State: String;
    Pin: Number;
    Contact_No_Residence: Number;
    Contact_No_Students: Number;
    Email: String;
    Student_Class_Category: Number;
    School_Name: String;
    School_Address: String;
    Class_X_Percentage: Number;
    Class_XII_Percentage: Number;
    Date_of_Admission: Date;
    Signature: String;
    Total_Course_Fees: Number;
    Admission_Fees: Number;
    Concession: Number;
    Total: Number;
    Paid_Amount: Number;
    Source_of_Information: Number;
}

const schema_coaching_student = new Schema({
    snap_shot: String,
    Admission_No: Number,
    Batch_Name: String,
    Program: Number,
    Full_Name: String,
    Father_Guardian_Name: String,
    Mother_Name: String,
    Date_Of_Birth: Date,
    Gender: Number,
    Blood_Group: String,
    Caste: Number,
    Nationality: Number,
    Address: String,
    City: String,
    State: String,
    Pin: Number,
    Contact_No_Residence: Number,
    Contact_No_Students: Number,
    Email: String,
    Student_Class_Category: Number,
    School_Name: String,
    School_Address: String,
    Class_X_Percentage: Number,
    Class_XII_Percentage: Number,
    Date_of_Admission: Date,
    Signature: String,
    Total_Course_Fees: Number,
    Admission_Fees: Number,
    Concession: Number,
    Total: Number,
    Paid_Amount: Number,
    Source_of_Information: Number
});

export const Coaching_student = model<coaching_student_document>('Coaching_student', schema_coaching_student);
