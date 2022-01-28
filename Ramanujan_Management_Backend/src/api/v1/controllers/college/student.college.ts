// import { NextFunction, Request, Response } from 'express';
// import asyncHandler from 'express-async-handler';
// import { StudentModelCollege }from '../models';
// import StudentService from '../services/students.service';
// import MailService from '../services/externalService/email.service';

// const studentService = new StudentService({
//     StudentModelCollege,
//     MailService: new MailService()
// });

// const studentController = {
//     // post
//     oneStudentAdmissionCollege: asyncHandler(async (req, res, next) => {
//         const data = await studentService.oneStudentAdmissionCollege(req.body);
//         res.status(200).json({ data });
//     }),
//     uploadAttendance: asyncHandler(async (req, res, next) => {
//         const data = await studentService.oneStudentAdmissionCoaching(req.body);
//         res.status(200).json({ data });
//     }),

//     // get
//     allStudentsCollege: asyncHandler(async (req, res, next) => {
//         const data = await studentService.allStudentsCollege();
//         res.status(200).json({ data });
//     }),

//     oneStudentsCollege: asyncHandler(async (req, res, next) => {
//         const { id } = req.params;
//         const data = await studentService.oneStudentsCollege(id);
//         res.status(200).json({ data });
//     }),

//     getAttendance: asyncHandler(async (req, res, next) => {
//         const data = await studentService.oneStudentAdmissionCoaching(req.body);
//         res.status(200).json({ data });
//     }),
//     // delete
//     deleteAllStudentsCollege: asyncHandler(async (req, res, next) => {
//         const data = await studentService.deleteAllStudentsCollege(req.body.deleteStudentsCollege);
//         res.status(200).json({
//             data
//         });
//     }),

//     deleteOneStudentCollege: asyncHandler(async (req, res, next) => {
//         const data = await studentService.deleteOneStudentCollege(req.body.deleteStudentsCoaching);
//         res.status(200).json({
//             data
//         });
//     }),

//     //patch
//     updateOneStudentCollege: asyncHandler(async (req, res, next) => {
//         const data = await studentService.updateOneStudentCollege(req.params.id, req.body);
//         res.status(200).json({
//             data
//         });
//     }),

// };

// export default studentController;

// //......
