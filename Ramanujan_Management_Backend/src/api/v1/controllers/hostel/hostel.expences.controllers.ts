// import { NextFunction , Request , Response } from "express";
// import asyncHandler from "express-async-handler";
// import { hostel_expences_model,hostel_expences_document } from "../../model/hostel/hostel.expencs.model";
// import { hostel_expences_service } from "../../service/hostel/hostel.expences.service";
// import MailService from "../../service/externalService/email.service";

// const Hostel_expences_service = new hostel_expences_service({
//     hostel_expences_model ,
//     MailService : new MailService()
// });

// export const hostel_expences_controllers = {

//     // post
//  create_new_hostel_expences : asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//     const {
//         hostel,
//         entry_date,
//         particular,
//         amount,
//         remarks,
//         payment_mode} = req.body;
//      const data = await Hostel_expences_service.create_new_hostel_expences(
//         hostel,
//         entry_date,
//         particular,
//         amount,
//         remarks,
//         payment_mode
//      )
//     res.status(200).json(data);
//     }),
// //get
//  get_data_by_id : asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//     const ID = req.params.id;
//     const data = await Hostel_expences_service.get_data_by_id(ID);
//     res.status(200).json(data);
//  }),

//  get_all_data : asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//     const data = await Hostel_expences_service.get_all_data();
//     res.status(200).json(data);
//  }),

// //delete
// delete_by_id :  asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
//    const ID = req.params.id;
//     const data = await Hostel_expences_service.delete_by_id(ID)
//    res.status(200).json(data);
// })
// }
