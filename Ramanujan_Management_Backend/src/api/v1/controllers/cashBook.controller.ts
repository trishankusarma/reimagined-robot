import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CashBookModel } from '../models';
import CashBookService from '../services/cashBook';

const cashBookService = new CashBookService({
    CashBookModel: CashBookModel
});

const CashBookController = {
    //post
    add_to_cashBook: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, 'req.body');

        const data = await cashBookService.add_to_cashBook(req.body);

        // 61475800f263b676d46eec12 -> super admin
        // 6148514ac4fea89bf88a66d9 -> hostel
        // 6149dd26f63755043885e64b -> Arts
        // 614ebf622f5e340573a65ab8 -> Science
        // 6158afe30d2c889cf4e33eec -> Testing
        // 6170f55cfe493e05e684cfb6 -> Coaching
        if (req.body.department != '6158afe30d2c889cf4e33eec' && req.body.department != '61475800f263b676d46eec12') {
            await cashBookService.add_to_cashBook({
                ...req.body,
                department: '61475800f263b676d46eec12'
            });
        }

        res.status(200).json(data);
    }),

    //get
    getAllcashBook: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { From_Date, To_date, department } = req.body;

        const data = await cashBookService.getAllcashBook(From_Date, To_date, department);
        res.status(200).json(data);
    }),

    getOnecashBook: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { From_Date, department } = req.body;

        const data = await cashBookService.getOnecashBook(From_Date, department);
        res.status(200).json(data);
    })
};

export default CashBookController;
