import { Schema, Document, model } from 'mongoose';

export interface Notice_Document extends Document {
    Type: Number;
    Class: String;
    Section: String;
    Subject: String;
    Title: String;
    Upload_file: String;
}

const Notice_Schema = new Schema({
    Type: Number,
    Class: String,
    Section: String,
    Subject: String,
    Title: String,
    Upload_file: String
});

export const NoticeModel = model<Notice_Document>('Notice', Notice_Schema);
