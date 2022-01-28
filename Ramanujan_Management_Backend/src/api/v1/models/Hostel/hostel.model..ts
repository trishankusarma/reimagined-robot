import { Document, Schema, model } from 'mongoose';

export interface hostel_document extends Document {
    Name: String;
    Address: String;
    Capacity: Number;
    Occupancy_Allowed: Number;
    noOfRooms: Number;
}

const schema_hostel = new Schema({
    Name: String,
    Address: String,
    Capacity: Number,
    Occupancy_Allowed: Number,
    noOfRooms: Number
});

schema_hostel.virtual('rooms', {
    ref: 'Hostel_room',
    localField: '_id',
    foreignField: 'hostel'
});

export const Hostel_Model = model<hostel_document>('hostel', schema_hostel);
