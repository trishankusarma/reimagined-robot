import { Document, Schema, model } from 'mongoose';

export interface section extends Document {
    num: Number;
    name: String;
}

const schema_section = new Schema({
    num: Number,
    name: String
});

const Section = model<section>('college_section', schema_section);

exports.Section = Section;
