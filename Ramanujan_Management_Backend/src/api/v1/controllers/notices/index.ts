import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NoticeModel } from '../../models';
import NoticeService from '../../services/notices/notices.service';
import MailService from '../../services/externalService/email.service';

const notice_service = new NoticeService({
    NoticeModel,
    MailService: new MailService()
});

export const notice_controller = {
    // post
    // 1)
    create_new_notice: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { Type, Class, Section, Subject, Title, Upload_file } = req.body;

        const data = await notice_service.create_new_notice(Type, Class, Section, Subject, Title, Upload_file);
        res.status(200).json({
            data
        });
    }),

    // get
    // 1)
    getAllNotice: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await notice_service.getAllNotice();

        res.status(200).json({
            data
        });
    }),

    // get
    // 2)
    getOneNotice: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await notice_service.getOneNotice(_id);

        res.status(200).json({
            data
        });
    }),

    // update
    // 1)
    updateOneNotice: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await notice_service.editOneNotice(_id, req.body);

        res.status(200).json({
            data
        });
    }),

    // delete
    // 1)
    deleteOneNotice: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await notice_service.deleteOneNotice(_id);

        res.status(200).json({
            data
        });
    })
};
