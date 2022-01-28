import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Room_Model } from '../../models';
import room_service from '../../services/hostel/room.service';
import MailService from '../../services/externalService/email.service';

const Room_service = new room_service({
    Room_Model,
    MailService: new MailService()
});

export const room_controllers = {
    //get
    get_all_hostel_rooms: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const rooms = await Room_service.getAllRooms(_id);

        console.log('rooms', rooms);

        res.status(200).json({
            rooms
        });
    }),

    //post
    create_new_room: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const room = await Room_service.create_new_room(req.body);

        res.status(200).json({
            room
        });
    }),

    //patch
    edit_one_room: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const room = await Room_service.editOneRoom(_id, req.body);

        console.log('room', room);

        res.status(200).json({
            room
        });
    }),

    //delete
    delete_one_room: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const room = await Room_service.deleteOneRoom(_id);

        res.status(200).json({
            room
        });
    })
};
