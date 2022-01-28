import { Router } from 'express';
import { studentController } from '../controllers';
import { student_hostel_controller } from '../controllers/hostel/student.hostel.controllers';
import multiAuth from '../middlewares/multiAuth';
import upload from '../middlewares/upload';
const router = Router();

// post
router.post('/admission', studentController.default.oneStudentAdmissionCollege);
router.post('/oneStudentAdmissionCoaching', multiAuth('type1'), studentController.default.oneStudentAdmissionCoaching);
router.post('/uploadAttendance', multiAuth('type1'), studentController.default.uploadAttendance);
router.post('/studentPayment', studentController.default.studentPayment);
router.post('/studentOtherFeePayment', studentController.default.studentOtherFeePayment);
router.post('/allStudentAttendence', studentController.default.allStudentAttendence);
router.post('/getAllStudentAttendence', studentController.default.getAllStudentAttendence);
router.post('/getAllStudentExam', studentController.default.getAllStudentExam);

//get
router.get('/allStudentsCollege/:id', studentController.default.allStudentsCollege);
router.get('/oneStudentsCollege/:id', studentController.default.oneStudentsCollege);
router.get('/oneStudentsCollegeForFee/:department/:rollNo', studentController.default.oneStudentsCollegeForFee);
router.get('/hostelFind/:rollNo', studentController.default.hostelFind);
router.get('/hostelStudentFee/:_id', student_hostel_controller.hostelFeeData);

router.post('/allStudentsFeeForDuration', studentController.default.allStudentsCollegeFee);
router.get('/getDataWithMarks/:_id', studentController.default.oneStudentsCollegeWithMarks);

router.get('/getAllBalanceStudent/:id/:departmentName', studentController.default.getAllBalanceStudent);
router.get('/allDepartmentStudents/:_id', studentController.default.allStudentsDepartment);
router.get('/getStudentAttendence', studentController.default.getStudentAttendence);
router.post('/getStudentsFeeReport', studentController.default.getStudentsFeeReport);
router.post('/expireSendMessage', studentController.default.expireSendMessage);

//delete
router.delete('/deleteOtherPayment/:id/:feeId', studentController.default.deleteOtherPayment);
router.delete('/deleteOneStudentCollege/:department/:id', studentController.default.deleteOneStudentCollege);

//patch
router.patch('/updateOneStudentCollege/:id', studentController.default.updateOneStudentCollege);
router.patch;

router.patch('/promoteStudents', studentController.default.promoteStudents);

router.get('/getStudentMarks/:_id/:exam', studentController.default.getStudentMarks);
router.post('/createStudentMarks', studentController.default.createStudentMarks);
router.patch('/editStudentMarks', studentController.default.editStudentMarks);

export const StudentRoutes: Router = router;
