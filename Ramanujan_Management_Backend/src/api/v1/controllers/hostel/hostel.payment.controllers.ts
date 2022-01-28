// import { NextFunction, Request, Response } from 'express';
// import asyncHandler from 'express-async-handler';
// import { payment_hostel_document, payment_hostel_model } from '../../models/hostel/hostel.payment.model';
// import { hostel_payment_service } from '../../services/hostel/hostel.payment.service';
// import MailService from '../../services/externalService/email.service';

// const Hostel_payment_service = new hostel_payment_service({
//     payment_hostel_model,
//     MailService: new MailService()
// });

// export const hostel_payment_controllers = {
//     //post
//     create_new_payment_student: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//         const {
//             student_hostel,
//             Payment_Date,
//             Monthly_Fees,
//             Pending_Fees,
//             Late_Fine,
//             Other_Penalty,
//             Other_Fees,
//             Concession,
//             Payable,
//             Admission_Balance,
//             Paid_Amount,
//             Year,
//             Month,
//             Payment_Type,
//             Payment_Mode
//         } = req.body;
//         const data = await Hostel_payment_service.create_new_payment_student(
//             student_hostel,
//             Payment_Date,
//             Monthly_Fees,
//             Pending_Fees,
//             Late_Fine,
//             Other_Penalty,
//             Other_Fees,
//             Concession,
//             Payable,
//             Admission_Balance,
//             Paid_Amount,
//             Year,
//             Month,
//             Payment_Type,
//             Payment_Mode
//         );
//         res.status(200).json(data);
//     }),
//     //get
//     get_data_by_id: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//         const ID = req.params.id;
//         const data = await Hostel_payment_service.get_data_by_id(ID);
//         res.status(200).json(data);
//     }),
//     //patch
//     update_payment_data: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//         const Data = req.params.data;
//         const ID = req.params.id;
//         const data = await Hostel_payment_service.update_payment_data(Id, Data);
//     })
// };
