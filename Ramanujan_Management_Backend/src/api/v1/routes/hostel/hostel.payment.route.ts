import express, { Router, Request, Response, NextFunction } from 'express';
// import { hostel_payment_controllers } from "../../controllers/hostel/hostel.payment.controllers";
const router = express.Router();

// //post
// router.post("/CreateNewPaymentStudent",hostel_payment_controllers.create_new_payment_student);
// //get
// router.get("/getDataById/:id",hostel_payment_controllers.get_data_by_id);
// //patch
// router.patch("/UpdatePaymentData/:id/:Data",hostel_payment_controllers.update_payment_data);

export const hostel_payment_router: Router = router;
