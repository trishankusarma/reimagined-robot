import { Router } from 'express';
import { AdminRoutes } from './admin';
import { StudentRoutes } from './students';
import { NotificationRoute } from './notice_notification';
import { LeaveApplicationRoute } from './leave_application';
import { StuffRoutes } from './stuffs';
import { HostelRoutes } from './hostel';
import { NoticeRouter } from './notices';
import { CashBookRouter } from './cashBook';
import { SessionRouter } from './session';
import { FeePaymentModel } from '../models/fee.model';
const router: Router = Router();

// admin routes
router.use('/admin', AdminRoutes);

//student routes
router.use('/student', StudentRoutes);

// notification
router.use('/notice_mail', NotificationRoute);

// LeaveApplication
router.use('/leaveApp', LeaveApplicationRoute);

//stuff routes
router.use('/stuff', StuffRoutes);

//hostel routes
router.use('/hostel', HostelRoutes);

//notice routes
router.use('/notice', NoticeRouter);

//cashbook routes
router.use('/cashBook', CashBookRouter);

//session routes
router.use('/session', SessionRouter);

router.delete('/fee/prev/:id/:Previd', async (req, res, next) => {
    try {
        const { Previd, id } = req.params;
        const data = await FeePaymentModel.findByIdAndUpdate(id, {
            $pull: {
                previousPayment: { _id: Previd }
            }
        });
        console.log(data, Previd, id, 'data');
        res.status(200).json({ message: 'deleted' });
    } catch (e) {
        console.log(e.message);
        throw new Error(e.message);
    }
});

router.delete('/fee/other/:id/:othervid', async (req, res, next) => {
    try {
        const { othervid, id } = req.params;
        await FeePaymentModel.findByIdAndUpdate(id, {
            $pull: {
                otherPayment: { _id: othervid }
            }
        });

        res.status(200).json({ message: 'deleted' });
    } catch (e) {
        console.log(e.message);
        throw new Error(e.message);
    }
});

export const MainRouter: Router = router;
