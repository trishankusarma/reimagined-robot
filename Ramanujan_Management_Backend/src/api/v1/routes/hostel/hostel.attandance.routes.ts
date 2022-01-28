import express, { Router, Request, Response, NextFunction } from 'express';
// import { hostel_attendance_controller } from '../../controllers/hostel/hostel.attandance.controllers';
const router = express.Router();

// //post
// router.post('/createNewAttendence', hostel_attendance_controller.create_new_hostel_attandance);
// //get
// router.get('/getAttendenceById/:id', hostel_attendance_controller.find_attend_hostel_by_id);

export const hostel_attendance_router: Router = router;
