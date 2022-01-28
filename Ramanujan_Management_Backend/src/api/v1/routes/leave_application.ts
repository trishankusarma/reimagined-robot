import { Router } from 'express';
import { leaveApplicationController } from '../controllers';
import multiAuth from '../middlewares/multiAuth';
const router = Router();

// post
router.post('/leaveApplication', leaveApplicationController.default.leaveApplication);

//get
router.get('/getAllLeaveApplication/:modelOf/:department', leaveApplicationController.default.getAllLeaveApplication);
router.get('/getAllApplication/:department', leaveApplicationController.default.getAllApplication);
// router.get('/getSendNotificaitonOne', leaveApplicationController.default);
// router.get('/allStudentsCollege', multiAuth('type1'), studentController.default.allStudentsCollege);

//delete
router.delete('/deleteLeaveApplication/:id/:modelOf/:department', leaveApplicationController.default.deleteLeaveApplication);

//patch
router.patch('/updateOneLeaveApplication', leaveApplicationController.default.updateOneLeaveApplication);
router.patch;

export const LeaveApplicationRoute: Router = router;
