import { isValid } from '../../utils/isValid';
import { room_document, Room_Model } from '../../models';
import MailService from '../externalService/email.service';
import { Model } from 'mongoose';

class Hostel_fee {
    private _Room_Model;
    private _MailService;

    constructor({ Room_Model, MailService }: { Room_Model: Model<room_document>; MailService: MailService }) {
        this._Room_Model = Room_Model;
        this._MailService = MailService;
    }

    // post
    async create_new_room(room: object) {
        try {
            const data = await this._Room_Model.create(room);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.name = 'OPPs unable to create new hostel data , please try again';
            error.statusCode = 404;
            throw error;
        }
    }

    //get
    async getAllRooms(hostel: any) {
        try {
            const rooms = await Room_Model.find({ hostel });

            return rooms;
        } catch (e: any) {
            console.log(e);
            const error: any = new Error(e);
            error.name = 'OPPs unable to fetch room data!';
            error.statusCode = 404;
            throw error;
        }
    }

    //delete
    async deletAllRooms(hostel: any) {
        try {
            const rooms = await Room_Model.find({ hostel });

            rooms.forEach(async (room) => {
                await room.remove();
            });

            return rooms;
        } catch (e: any) {
            console.log(e);
            const error: any = new Error(e);
            error.name = 'OPPs unable to fetch room data!';
            error.statusCode = 404;
            throw error;
        }
    }

    //edit
    async editOneRoom(id: string, dataUpdate: object) {
        try {
            await this._Room_Model.findByIdAndUpdate(id, {
                ...dataUpdate
            });

            return dataUpdate;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to update the room of id ${id}`;
            throw error;
        }
    }

    // @delete request
    async deleteOneRoom(id: string) {
        try {
            const data = await this._Room_Model.findByIdAndDelete(id);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete the room of id ${id}`;
            throw error;
        }
    }
}
export default Hostel_fee;
