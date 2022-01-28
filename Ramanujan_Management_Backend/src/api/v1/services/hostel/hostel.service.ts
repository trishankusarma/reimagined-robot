import { isValid } from '../../utils/isValid';
import { hostel_document } from '../../models/Hostel/hostel.model.';
import MailService from '../externalService/email.service';
import { Model, Document } from 'mongoose';

class hostel_room_service {
    private _Hostel_Model;
    private _MailService;
    constructor({ Hostel_Model, MailService }: { Hostel_Model: Model<hostel_document>; MailService: MailService }) {
        this._Hostel_Model = Hostel_Model;
        this._MailService = MailService;
    }

    // post
    async create_new_hostel(Name: String, Address: String, Capacity: Number, Occupancy_Allowed: Number, noOfRooms: Number) {
        try {
            const data = await this._Hostel_Model.create({
                Name,
                Address,
                Capacity,
                Occupancy_Allowed,
                noOfRooms
            });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.name = 'OPPs unable to create new hostel data , please try again';
            error.statusCode = 404;
            throw error;
        }
    }

    async getAllHostels() {
        try {
            const data = await this._Hostel_Model.find({}).populate('rooms', 'roomNo');

            let hostels = data?.map((item) => {
                return {
                    hostel: item,
                    rooms: item.rooms
                };
            });

            return hostels;
        } catch (e: any) {
            const error: any = new Error(e);
            throw error;
        }
    }

    //edit
    async editOneHostel(id: string, dataUpdate: object) {
        try {
            await this._Hostel_Model.findByIdAndUpdate(id, dataUpdate);
            return dataUpdate;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to update the hostel of id ${id}`;
            throw error;
        }
    }

    // @delete request
    async deleteOneHostel(id: string) {
        try {
            const data = await this._Hostel_Model.findByIdAndDelete(id);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete the hostel of id ${id}`;
            throw error;
        }
    }
}
export default hostel_room_service;
