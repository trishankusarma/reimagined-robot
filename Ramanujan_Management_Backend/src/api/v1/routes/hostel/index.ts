import { Router } from 'express';
const router: Router = Router();

import { hostel_router } from './hostel.route';
import { room_router } from './room.routes';
import { student_hostel_router } from './student.hostel.route';
import { hostel_payment_router } from './hostel.payment.route';
import { hostel_attendance_router } from './hostel.attandance.routes';
import { hostel_expence_router } from './hostel.expences.route';

router.use('/hostel_room', hostel_router);
router.use('/hostel/room', room_router);
router.use('/student', student_hostel_router);
router.use('/payment', hostel_payment_router);
router.use('/attendance', hostel_attendance_router);
router.use('/expence', hostel_expence_router);

export const HostelRoutes: Router = router;
