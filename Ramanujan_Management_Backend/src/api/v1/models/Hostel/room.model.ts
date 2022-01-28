import mongoose, { Schema } from 'mongoose';

export interface room_document extends mongoose.Document {
    hostel: String;
    roomNo: Number;
    floorNo: Number;
    capacity: Number;
    occupied: Number;
}

const schema_room = new mongoose.Schema({
    hostel: {
        type: Schema.Types.ObjectId,
        ref: 'hostel'
    },
    roomNo: Number,
    floorNo: Number,
    capacity: Number,
    occupied: Number
});

export const Room_Model = mongoose.model<room_document>('Hostel_room', schema_room);
