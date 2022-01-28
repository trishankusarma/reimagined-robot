import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SessionModel } from '../../models';
import SessionService from '../../services/sessions/index';

const session_service = new SessionService({
    SessionModel
});

const SessionController = {
    // post
    // 1)
    create_new_Session: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await session_service.create_new_Session(req.body);
        res.status(200).json(data);
    }),

    // get
    // 1)
    getAllSessions: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await session_service.getAllSessions(req.params._id);

        res.status(200).json(data);
    }),

    // get
    // 2)
    getOneSession: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await session_service.getOneSession(_id);

        res.status(200).json(data);
    }),

    // update
    // 1)
    editOneSession: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await session_service.editOneSession(_id, req.body);

        res.status(200).json(data);
    }),

    // delete
    // 1)
    deleteOneSession: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await session_service.deleteOneSession(_id);

        res.status(200).json(data);
    })
};

export default SessionController;
