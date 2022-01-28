import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StudentModelCollege, FeePaymentModel, StudentModelCoaching, Leave_Application_Model, Student_marks_Model, Student_attendance_Model, FeeInstanceModel } from '../models';

import StudentService from '../services/students.service';
import MailService from '../services/externalService/email.service';

const studentService = new StudentService({
    StudentModelCollege,
    StudentModelCoaching,
    Leave_Application_Model,
    FeePaymentModel,
    Student_marks_Model,
    Student_attendance_Model,
    FeeInstanceModel,
    MailService: new MailService()
});

const studentController = {
    // post
    getAllStudentExam: asyncHandler(async (req, res, next) => {
        const { Session, Class, Section } = req.body;

        const data = await studentService.getAllStudentExam(Session, Class, Section);
        res.status(200).json(data);
    }),

    allStudentAttendence: asyncHandler(async (req, res, next) => {
        const data = await studentService.allStudentAttendence(req.body);
        res.status(200).json(data);
    }),

    getAllStudentAttendence: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await studentService.getAllStudentAttendence(req.body);
        res.status(200).json(data);
    }),

    oneStudentAdmissionCollege: asyncHandler(async (req, res, next) => {
        const data = await studentService.oneStudentAdmissionCollege(req.body);
        res.status(200).json({ data });
    }),
    oneStudentAdmissionCoaching: asyncHandler(async (req, res, next) => {
        const data = await studentService.oneStudentAdmissionCoaching(req.body);
        res.status(200).json({ data });
    }),

    uploadAttendance: asyncHandler(async (req, res, next) => {
        const data = await studentService.oneStudentAdmissionCoaching(req.body);
        res.status(200).json({ data });
    }),

    studentPayment: asyncHandler(async (req, res, next) => {
        const { info, department, student, departmentName } = req.body;
        const { data, studentData } = await studentService.studentPayment(info, department, student, departmentName);

        res.status(200).json({ data, studentInfo: studentData });
    }),

    getStudentMarks: asyncHandler(async (req, res, next) => {
        const { _id, exam } = req.params;
        const data = await studentService.getStudentMarks(exam, _id);
        res.status(200).json(data);
    }),

    createStudentMarks: asyncHandler(async (req, res, next) => {
        const data = await studentService.createStudentMarks(req.body);
        res.status(200).json(data);
    }),

    editStudentMarks: asyncHandler(async (req, res, next) => {
        const data = await studentService.editStudentMarks(req.body, req.body.Exam, req.body.Student_id);
        res.status(200).json(data);
    }),
    // get

    studentOtherFeePayment: asyncHandler(async (req, res, next) => {
        const { info, department, student, departmentName } = req.body;
        const data = await studentService.studentOtherFeePayment(info, department, student, departmentName);
        res.status(200).json({ data });
    }),

    // get
    allStudentsCollege: asyncHandler(async (req, res, next) => {
        const data = await studentService.allStudentsCollege(req.params.id);
        res.status(200).json({ data });
    }),
    allStudentsDepartment: asyncHandler(async (req, res, next) => {
        const { _id } = req.params;
        const data = await studentService.allStudentsOfDepartment(_id);
        res.status(200).json(data);
    }),

    promoteStudents: asyncHandler(async (req, res, next) => {
        const { selectedStudents, promote } = req.body;
        const data = await selectedStudents?.map(async (id: any) => await studentService.updateOneStudentCollege(id, promote));

        return res.json(data);
    }),

    oneStudentsCollege: asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const data = await studentService.oneStudentsCollege(id);
        res.status(200).json({ data });
    }),

    oneStudentsCollegeWithMarks: asyncHandler(async (req, res, next) => {
        const { _id } = req.params;
        const data = await studentService.oneStudentsCollegeWithMarks(_id);
        res.status(200).json(data);
    }),

    getAttendance: asyncHandler(async (req, res, next) => {
        const data = await studentService.oneStudentAdmissionCoaching(req.body);
        res.status(200).json({ data });
    }),
    getStudentAttendence: asyncHandler(async (req, res, next) => {
        const data = await studentService.getStudentAttendence(req.query?.reqDetails);
        res.status(200).json({ data });
    }),

    oneStudentsCollegeForFee: asyncHandler(async (req, res, next) => {
        const data = await studentService.oneStudentsCollegeForFee(req.params.department, req.params.rollNo);
        res.status(200).json({ data });
    }),

    hostelFind: asyncHandler(async (req, res, next) => {
        const data = await studentService.hostelFind(req.params.rollNo, req.params.department);
        res.status(200).json({ data });
    }),

    allStudentsCollegeFee: asyncHandler(async (req, res, next) => {
        const { department, FromDate, ToDate } = req.body;

        const data = await studentService.allStudentsCollegeFee(department, FromDate, ToDate);
        res.status(200).json(data);
    }),

    getAllBalanceStudent: asyncHandler(async (req, res, next) => {
        const data = await studentService.getAllBalanceStudent(req.params.id, req.params.departmentName);
        res.status(200).json({ data });
    }),
    // delete
    deleteAllStudentsCollege: asyncHandler(async (req, res, next) => {
        const data = await studentService.deleteAllStudentsCollege(req.body.deleteStudentsCollege);
        res.status(200).json({
            data
        });
    }),
    deleteAllStudentsCoaching: asyncHandler(async (req, res, next) => {
        const data = await studentService.deleteAllStudentsCoaching(req.body.deleteStudentsCoaching);
        res.status(200).json({
            data
        });
    }),
    deleteOneStudentCollege: asyncHandler(async (req, res, next) => {
        const data = await studentService.deleteOneStudentCollege(req.params.id, req.params.department);
        res.status(200).json(data);
    }),

    deleteOtherPayment: asyncHandler(async (req, res, next) => {
        const data = await studentService.deleteOtherPayment(req.params.feeId, req.params.id);
        res.status(200).json({
            data
        });
    }),
    oneStudentCoaching: asyncHandler(async (req, res, next) => {
        const data = await studentService.oneStudentCoaching(req.params.id);
        res.status(200).json({
            data
        });
    }),
    expireSendMessage: asyncHandler(async (req, res, next) => {
        console.log(req.body.phoneNo, 'req.body.phoneNo');
        const data = await studentService.expireSendMessage(req.body.phoneNo);
        res.status(200).json({
            data
        });
    }),

    //patch
    updateOneStudentCollege: asyncHandler(async (req, res, next) => {
        console.log(req.body, 'dataUpdate');
        const data = await studentService.updateOneStudentCollege(req.params.id, req.body);
        res.status(200).json({
            data
        });
    }),

    updateOneStudentCoaching: asyncHandler(async (req, res, next) => {
        const data = await studentService.updateOneStudentCoaching(req.params.id, req.body);
        res.status(200).json({
            data
        });
    }),
    // report
    getStudentsFeeReport: asyncHandler(async (req, res, next) => {
        const data = await studentService.getStudentsFeeReport(req.body);
        res.status(200).json({
            data
        });
    })
};

export default studentController;
