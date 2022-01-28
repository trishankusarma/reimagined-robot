import { Request, Response } from 'express';
import multer from 'multer';

const excelFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
        cb(null, true);
    } else {
        cb('Please upload only excel file.', false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file: any, cb: any) => {
        cb(null, __dirname + '/../uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-ra-${file.originalname}`);
    }
});

const uploadFile = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        cb(null, true);
    }
});
export default uploadFile;
