import { Document, model, Schema } from 'mongoose';

export interface student_class extends Document {
    name: String;
    num: Number;
}

const class_schema = new Schema({
    name: String,
    num: Number
});

const Class = model<student_class>('class', class_schema);

exports.Class = Class;
