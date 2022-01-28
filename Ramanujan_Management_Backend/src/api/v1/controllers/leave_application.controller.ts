import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StudentModelCollege, Leave_Application_Model } from '../models';
import LeaveApplicationService from '../services/leave_application.service';

const leaveApplicationService = new LeaveApplicationService({
    StudentModelCollege: StudentModelCollege,
    Leave_Application_Model: Leave_Application_Model
});
const notificationAndMailController = {
    //post
    leaveApplication: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id, modelOf, reason, From_Date, To_date, department } = req.body;
        console.log(department, 'department');
        let data = await leaveApplicationService.leaveApplication(id, modelOf, reason, From_Date, To_date, department);
        res.status(200).json({ data });
    }),

    //get
    getAllLeaveApplication: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await leaveApplicationService.getAllLeaveApplication(req.params.modelOf, req.params.department);
        console.log(data, 'data');
        res.status(200).json({ data });
    }),
    getAllApplication: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await leaveApplicationService.getAllApplication(req.params.department);
        res.status(200).json({ data });
    }),
    //delete
    deleteLeaveApplication: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            await leaveApplicationService.deleteLeaveApplication(req.params.id);
            const data = await leaveApplicationService.getAllApplication(req.params.department);
            console.log(data, 'data');
            res.status(200).json({ data });
        } catch (e) {
            console.log(e, 'error');
        }
    }),

    //patch
    updateOneLeaveApplication: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id, id, modelOf, reason, From_Date, To_date, department } = req.body;
        await leaveApplicationService.updateOneLeaveApplication(_id, id, modelOf, reason, From_Date, To_date, department);
        const data = await leaveApplicationService.getAllLeaveApplication(modelOf, department);
        res.status(200).json({ data });
    })
};

export default notificationAndMailController;
