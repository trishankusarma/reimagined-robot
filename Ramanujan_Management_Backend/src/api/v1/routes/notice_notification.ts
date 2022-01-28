import { Router } from 'express';
import { notificationAndMailController } from '../controllers';
import multiAuth from '../middlewares/multiAuth';
const router = Router();

// post
router.post('/sendMessage/:departmentId', notificationAndMailController.default.sendMessage);

//get
router.get('/sendMessageAll/:departmentId', notificationAndMailController.default.getSendNotificaitonAll);
router.get('/getSendNotificaitonOne', notificationAndMailController.default.getSendNotificaitonOne);
// router.get('/allStudentsCollege', multiAuth('type1'), studentController.default.allStudentsCollege);

//delete
router.delete('/deleteSendNotificaiton/:departmentId', notificationAndMailController.default.deleteSendNotificaiton);
router.delete;

//patch

router.patch;

export const NotificationRoute: Router = router;
