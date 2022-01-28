import express, { Router, Request, Response, NextFunction } from 'express';
import { student_hostel_controller } from '../../controllers/hostel/student.hostel.controllers';
const router = express.Router();

// post
router.post('/createhostelstudent', student_hostel_controller.create_new_hostel_student);

// get
router.get('/getallstudents', student_hostel_controller.get_all_student);
router.get('/getonestudent/:_id', student_hostel_controller.get_one_student);
router.get('/getStudent/:enrollment_no', student_hostel_controller.get_one_studentRoll);

//delete
router.delete('/deleteonestudent/:id', student_hostel_controller.delete_one_student);

//Patch
router.patch('/updateonestudent/:id', student_hostel_controller.update_one_student); // getting the data to be updated

export const student_hostel_router: Router = router;

// /hostel
