import { Schema, Document, model } from 'mongoose';

export interface Section extends Document {
    name: string;
}

const Section_Schema = new Schema({
    name: String
});

export const SectionModel = model<Section>('Section', Section_Schema);
