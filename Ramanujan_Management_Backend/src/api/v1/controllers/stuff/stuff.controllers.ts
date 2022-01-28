import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StuffModel, SalarySlipModel, Stuff_attendance_Model } from '../../models';
import StuffService from '../../services/stuff/stuff.services';
import MailService from '../../services/externalService/email.service';

const stuff_service = new StuffService({
    StuffModel,
    MailService: new MailService(),
    SalarySlipModel,
    Stuff_attendance_Model
});

export const stuff_controller = {
    getLastId: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.getLastId(req.params._id);
        res.status(200).json(data);
    }),

    // post
    // 1)
    create_new_stuff: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const {
            snap_shot,
            idNo,
            biometric_code,
            DOB,
            name,
            gender,
            address,
            mobileNo,
            email,
            joining_Date,
            designation,
            maritial_Status,
            blood_grp,
            leave_application_date,
            leave_application_name,
            leave_application_reason
        } = req.body;

        const data = await stuff_service.create_new_stuff_id(
            snap_shot,
            idNo,
            biometric_code,
            DOB,
            name,
            gender,
            address,
            mobileNo,
            email,
            joining_Date,
            designation,
            maritial_Status,
            blood_grp,
            leave_application_date,
            leave_application_name,
            leave_application_reason
        );
        res.status(200).json({
            data
        });
    }),

    salarySlipCreate: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const {
            stuff_id,
            basicPay,
            DA,
            HRA,
            conveyance,
            otherAllowance,
            grossSalary,
            PF,
            ESI,
            loanDeduction,
            professionalTax,
            absentPenalty,
            advancedSalary,
            TDSIT,
            netSalary,
            paymentMethod,
            department,
            year,
            month
        } = req.body;

        const data = await stuff_service.salarySlipCreate(
            stuff_id,
            basicPay,
            DA,
            HRA,
            conveyance,
            otherAllowance,
            grossSalary,
            PF,
            ESI,
            loanDeduction,
            professionalTax,
            absentPenalty,
            advancedSalary,
            TDSIT,
            netSalary,
            paymentMethod,
            department,
            year,
            month
        );

        res.status(200).json({
            data
        });
    }),

    getAllStuffPaymentForDuration: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.getAllStuffPaymentForDuration(req.body);
        res.status(200).json(data);
    }),

    getStuffAttendence: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.getStuffAttendence(req.body);
        res.status(200).json(data);
    }),

    getOneStuffAttendance: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.getOneStuffAttendance(req.query?.reqDetails);
        res.status(200).json({ data });
    }),

    allStuffAttendence: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.allStuffAttendence(req.body);
        res.status(200).json(data);
    }),

    // get
    // 1)
    getAllStuff: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.getAllStuff(req.params._id);

        res.status(200).json({
            data
        });
    }),

    salarySlipGetOne: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.salarySlipGetOne(req.params.departmentId, req.params.id);
        res.status(200).json({
            data
        });
    }),

    salarySlipGetAll: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await stuff_service.salarySlipGetAll(req.params.departmentId);
        res.status(200).json({
            data
        });
    }),

    getAllStuffDepartment: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;
        const data = await stuff_service.getAllStuffDepartment(_id);

        res.status(200).json(data);
    }),

    // get
    // 2)
    getOneStuff: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await stuff_service.getOneSuff(_id);

        res.status(200).json({
            data
        });
    }),

    // update
    // 1)
    updateOneStuff: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await stuff_service.editOneStuff(_id, req.body);

        res.status(200).json({
            data
        });
    }),
    // delete
    // 1)
    deleteOneStuff: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        const data = await stuff_service.deleteOneStuff(_id);

        res.status(200).json({
            data
        });
    })
};
