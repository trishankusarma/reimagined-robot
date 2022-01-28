import express, { Router, Response, Request, NextFunction } from 'express';
import { CashBookController } from '../controllers/index';

const { add_to_cashBook, getAllcashBook, getOnecashBook } = CashBookController.default;

const router = express.Router();

router.post('/add_to_cashBook', add_to_cashBook);

router.post('/getAllcashBook', getAllcashBook);

router.post('/getOnecashBook', getOnecashBook);

export const CashBookRouter: Router = router;

// to be called from ::

// 1 Student Registration
// 2 Fees Payment

// 3 Hostel Registration
// 4 Hostel Fees payment

// 5 Expenditures
// 6 Stuff Salary Expenses
// 7 Event Expenses

// /cashBook/add_to_cashBook
