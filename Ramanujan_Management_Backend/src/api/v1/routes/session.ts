import express, { Router, Response, Request, NextFunction } from 'express';
import { SessionController } from '../controllers';

const router = express.Router();

// //post
router.post('/create_new_Session', SessionController.default.create_new_Session);

// //get
router.get('/getAllSessions/:_id', SessionController.default.getAllSessions);

router.get('/get/:_id', SessionController.default.getOneSession);

// //update
router.patch('/edit/:_id', SessionController.default.editOneSession);

// //delete
router.delete('/delete/:_id', SessionController.default.deleteOneSession);

export const SessionRouter: Router = router;

//  /session/create_new_Session
