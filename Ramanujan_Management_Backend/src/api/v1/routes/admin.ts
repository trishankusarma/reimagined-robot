import express, { Request, Response, NextFunction, Router } from 'express';
import { adminController } from '../controllers';
import multiAuth from '../middlewares/multiAuth';
import asyncHandler from 'express-async-handler';
const router = express.Router();

// post
router.post('/create', adminController.default.create);
router.post('/createOneAdmin', multiAuth('type1'), adminController.default.createOneAdmin);
router.post('/signin', adminController.default.loginAdmin);
router.post('/forgotPasswordSuperAdmin/', adminController.default.forgotPasswordSuperAdmin);
router.post('/forgotPasswordAdmin', adminController.default.forgotPasswordAdmin);
router.post('/resetpassword/:id/:token', adminController.default.resetpassword);
router.post('/logout', multiAuth(''), adminController.default.logout);
router.post('/logoutAll', multiAuth(''), adminController.default.logoutAll);
router.post('/createDepartment', adminController.default.createDepartment);
router.post('/expenditureCreate', adminController.default.expenditureCreate);
router.post('/eventManagementCreate', adminController.default.eventManagementCreate);
router.post('/getAllExpenditureForDuration', adminController.default.getAllExpenditureForDuration);

// get
router.get('/allAdmin', adminController.default.getAllAdmin);
router.get('/oneAdmin/:id', multiAuth('type2'), adminController.default.oneAdmin);
router.get('/adminProfile/:id', multiAuth('type2'), adminController.default.adminProfile);
router.get('/superAdminProfile/:id', multiAuth('type2'), adminController.default.superAdminProfile);
router.get('/getAllDepartments', adminController.default.getAllDepartments);
router.get('/getOneDepartments', multiAuth('type1'), adminController.default.getOneDepartments);
router.get('/getAllExpenditure/:id', adminController.default.getAllExpenditure);
router.get('/getAllEventManagement/:id', adminController.default.getAllEventManagement);
router.post('/getAllEventManagementDuration', adminController.default.getAllEventManagementDuration);

router.get('/getIntitialValues/:_id', adminController.default.getIntitialValues);

// delete
router.delete('/allAdmin', multiAuth('type1'), adminController.default.deleteAllAdmin);
router.delete('/oneAdmin/:id', adminController.default.deleteOneAdmin);
router.delete('/DeleteOneDepartments', multiAuth('type1'), adminController.default.DeleteOneDepartments);
router.post('/expenditureDelete/:id', adminController.default.expenditureDelete);
router.post('/eventManagementDelete/:id', adminController.default.eventManagementDelete);

// patch
router.patch('/oneAdmin/:id', multiAuth('type2'), adminController.default.updateOneAdmin);
router.patch('/changeCredentialsSuperAdmin/:id', multiAuth('type2'), adminController.default.changeCredentialsSuperAdmin);
router.patch('/changeCredentialsAdmin/:id', multiAuth('type2'), adminController.default.changeCredentialsAdmin);
router.patch('/updateProfileSuperAdmin/:id', multiAuth('type2'), adminController.default.updateProfileSuperAdmin);
router.patch('/updateProfileAdmin/:id', multiAuth('type2'), adminController.default.updateProfileAdmin);
router.patch('/updateOneDepartments', multiAuth('type1'), adminController.default.updateOneDepartments);
router.patch('/expenditureEdit/:id', adminController.default.expenditureEdit);
router.patch('/eventManagementEdit/:id', adminController.default.eventManagementEdit);
router.get('/testing', multiAuth('type1'), (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'tesing1 bro' }).status(200);
});
router.get(
    '/testing3/:id',
    multiAuth('type2'),
    asyncHandler((req, res, next) => {
        res.json({ message: 'testing2 bro' }).status(200);
    })
);

export const AdminRoutes: Router = router;
