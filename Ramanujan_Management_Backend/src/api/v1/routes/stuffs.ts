import express, { Router, Response, Request, NextFunction } from 'express';
import { stuff_controller } from '../controllers/stuff/stuff.controllers';

const {
    create_new_stuff,
    salarySlipGetAll,
    getAllStuff,
    getOneStuff,
    updateOneStuff,
    deleteOneStuff,
    salarySlipCreate,
    salarySlipGetOne,
    getAllStuffDepartment,
    allStuffAttendence,
    getStuffAttendence,
    getOneStuffAttendance,
    getAllStuffPaymentForDuration,
    getLastId
} = stuff_controller;

const router = express.Router();

//post
router.post('/createNewStuff', create_new_stuff);
router.post('/salarySlipCreate', salarySlipCreate);
router.post('/allStuffAttendence', allStuffAttendence);
router.post('/getAllStuffPaymentForDuration', getAllStuffPaymentForDuration);

router.post('/getStuffAttendence', getStuffAttendence);

//get one stuff attendance
router.get('/getOneStuffAttendance', getOneStuffAttendance);

//get
router.get('/getAllStuff/:_id', getAllStuff);
router.get('/salarySlipGetOne/:departmentId/:id', salarySlipGetOne);
router.get('/salarySlipGetAll/:departmentId', salarySlipGetAll);

//get all stuff of a department
router.get('/allDepartmentStuff/:_id', getAllStuffDepartment);

//get last Id
router.get('/getLastId/:_id', getLastId);

router.get('/get/:_id', getOneStuff);

//update
router.patch('/edit/:_id', updateOneStuff);

//delete
router.delete('/delete/:_id', deleteOneStuff);

export const StuffRoutes: Router = router;
