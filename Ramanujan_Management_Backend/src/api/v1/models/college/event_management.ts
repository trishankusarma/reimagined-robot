import { Document, Schema, model } from 'mongoose';

export interface event_management extends Document {
    Event: String;
    Date: Date;
    Budget_Allocated: Number;
    Budget_used: Number;
    Organizer: String;
    Remarks: String;
}

const schema_event = new Schema({
    Event: String,
    Date: Date,
    Budget_Allocated: Number,
    Budget_used: Number,
    Organizer: String,
    Remarks: String
});

export const Event_management = model<event_management>('Event_management', schema_event);
