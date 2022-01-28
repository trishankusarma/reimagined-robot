import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Student_hostel_admission_Model, FeePaymentModel } from '../../models';
import student_hostel_service from '../../services/hostel/student.hostel.service';
import MailService from '../../services/externalService/email.service';

const Student_hostel_service = new student_hostel_service({
    Student_hostel_admission_Model,
    MailService: new MailService()
});

export const student_hostel_controller = {
    // post
    create_new_hostel_student: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const {
            hostel,
            room,
            enrollment_no,
            Admission_Date,
            Admission_Fee, //admissionFee
            admission_paid, //admissionPaid
            Monthly_Fees, //programFees
            Concession_Discount, //concession
            Total, //totalFee
            Total_paid, //paidAmount
            otherFee, //otherFee
            Year,
            month,
            payment_mode,
            department
        } = req.body;

        const data = await Student_hostel_service.create_new_student(
            hostel,
            room,
            enrollment_no,
            Admission_Date,
            Admission_Fee,
            admission_paid,
            Monthly_Fees,
            Concession_Discount,
            Total,
            Total_paid,
            otherFee,
            Year,
            month,
            payment_mode,
            department
        );

        res.status(200).json(data);
    }),

    //get
    get_all_student: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await Student_hostel_service.get_all_student();
        res.status(200).json(data);
    }),
    get_one_student: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;

        console.log(_id);

        const data = await Student_hostel_service.get_one_student(_id);
        res.status(200).json(data);
    }),

    hostelFeeData: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params;
        const data = await Student_hostel_service.get_one_student(_id);

        if (!data) {
            return { error: 'Student from college not found!' };
        }

        const payment = await FeePaymentModel.findOne({
            department: data.department,
            student: data.student.toString()
        }).populate('student previousPayment.instance otherPayment.instance');

        res.status(200).json({ data: data, payment: payment });
    }),

    get_one_studentRoll: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { enrollment_no } = req.params;
        console.log(enrollment_no, 'enrollment_no');
        const data = await Student_hostel_service.get_one_studentRoll(enrollment_no);
        res.status(200).json(data);
    }),
    // delete
    delete_one_student: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await Student_hostel_service.delete_one_student(req.params.id);
        res.status(200).json(data);
    }),

    //Patch
    update_one_student: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let ID = req.params.id;

        const data = await Student_hostel_service.update_one_student(ID, req.body); // data should be recieve to update from route
        res.status(200).json(data);
    })
};
