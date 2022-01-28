import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Hostel_Model, Room_Model } from '../../models';
import hostel_room_service from '../../services/hostel/hostel.service';
import room_service from '../../services/hostel/room.service';
import MailService from '../../services/externalService/email.service';
import { Types } from 'mongoose';

const Hostel_room_service = new hostel_room_service({
    Hostel_Model,
    MailService: new MailService()
});

const Room_service = new room_service({
    Room_Model,
    MailService: new MailService()
});

export const hostel_room_controllers = {
    //post
    create_new_hostel: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { Name, Address, Capacity, Occupancy_Allowed, noOfRooms } = req.body;

        const hostel = await Hostel_room_service.create_new_hostel(Name, Address, Capacity, Occupancy_Allowed, noOfRooms);

        for (let index = 0; index < noOfRooms; index++) {
            await Room_service.create_new_room({
                hostel: hostel._id,
                roomNo: index + 1,
                floorNo: 0,
                capacity: 0,
                occupied: 0
            });
        }

        res.status(200).json({
            hostel
        });
    }),

    //get
    get_all_hostels: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const hostels = await Hostel_room_service.getAllHostels();

        res.status(200).json({
            hostels
        });
    }),

    //patch
    edit_one_hostel: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const formData = req.body;

        const hostel = await Hostel_room_service.editOneHostel(_id, formData);

        res.status(200).json({
            hostel
        });
    }),

    //delete
    delete_one_hostel: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const hostel = await Hostel_room_service.deleteOneHostel(_id);

        await Room_service.deletAllRooms(hostel._id);

        res.status(200).json({
            hostel
        });
    })
};
