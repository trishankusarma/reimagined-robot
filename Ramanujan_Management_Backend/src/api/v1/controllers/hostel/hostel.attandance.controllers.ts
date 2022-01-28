// import { NextFunction , Request , Response } from "express";
// import asyncHandler from "express-async-handler";
// import { hostel_attandance_model,hostel_attandance_document } from "../../model/hostel/hostel.attandance.model";
// import { hostel_attandance_service } from "../../service/hostel/hostel.attandance.service";
// import MailService from "../../service/externalService/email.service";

// const hostel_attandance = new hostel_attandance_service({
//     hostel_attandance_model ,
//     MailService : new MailService()
// });

// export const hostel_attendance_controller = {
//   //post
//   create_new_hostel_attandance : asyncHandler(async (req, res, next) => {
//         const data = await hostel_attandance.create_new_hostel_attandance(req.body);
//         res.status(200).json({ data });
//     }),

//   //get
//   find_attend_hostel_by_id : asyncHandler(async (req, res, next) => {
//         const data = await hostel_attandance.find_attend_hostel_by_id(req.params.id);
//         res.status(200).json({ data });
//     }),

// }
