import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StudentModelCollege, NotificationModel } from '../models';
import MailService from '../services/externalService/email.service';
import MessageService from '../services/externalService/message.service';
import NotificationAndMailService from '../services/notice_notification.service';

const NotificationService = new NotificationAndMailService({
    StudentModelCollege: StudentModelCollege,
    MailService: new MailService(),
    NotificationModel: NotificationModel,
    MessageService: new MessageService()
});
const notificationAndMailController = {
    //post
    sendMessage: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { people, message, title } = req.body;

        await NotificationService.sendNotificaiton(people, message, title, req.params.departmentId);
        let data = await NotificationService.getSendNotificaitonAll(req.params.departmentId);
        console.log(data, 'data');
        res.status(200).json(data);
    }),

    //get
    getSendNotificaitonAll: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await NotificationService.getSendNotificaitonAll(req.params.departmentId);
        res.status(200).json({ data });
    }),

    getSendNotificaitonOne: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await NotificationService.getSendNotificaitonOne(id);
        res.status(200).json({ data });
    }),

    //delete
    deleteSendNotificaiton: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await NotificationService.deleteSendNotificaiton(req.body);
        const data = await NotificationService.getSendNotificaitonAll(req.params.departmentId);
        res.status(200).json({ data });
    })
    //patch
};

export default notificationAndMailController;
