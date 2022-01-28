import express, { Router, Response, Request, NextFunction } from 'express';
import { notice_controller } from '../controllers/notices';

const { create_new_notice, getAllNotice, getOneNotice, updateOneNotice, deleteOneNotice } = notice_controller;

const router = express.Router();

//post
router.post('/createNewNotice', create_new_notice);

//get
router.get('/getAllNotice', getAllNotice);

router.get('/get/:_id', getOneNotice);

//update
router.patch('/edit/:_id', updateOneNotice);

//delete
router.delete('/delete/:_id', deleteOneNotice);

export const NoticeRouter: Router = router;

//  /notices
