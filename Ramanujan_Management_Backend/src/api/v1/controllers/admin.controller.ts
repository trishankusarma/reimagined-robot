import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { EventMangementModel, AdminModel, DepartmentModel, ExpenditureModel } from '../models';
import AuthService from '../services/auth.service';
import AdminService from '../services/admin.service';
import MailService from '../services/externalService/email.service';

const authService = new AuthService({
    AdminModel,
    MailService: new MailService()
});

const adminService = new AdminService({
    AdminModel,
    DepartmentModel,
    MailService: new MailService(),
    ExpenditureModel,
    EventMangementModel
});

const adminController = {
    //get
    getIntitialValues: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.getIntitialValues(req.params._id);

        res.status(200).json(data);
    }),

    //post
    getAllEventManagementDuration: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { department, FromDate, ToDate } = req.body;
        const data = await adminService.getAllEventManagementDuration(department, FromDate, ToDate);

        res.status(200).json(data);
    }),

    create: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, adminType } = req.body;

        const { user, token } = await authService.signUp(name, email, password, true, adminType, ['']);
        res.status(200).json({ user, token });
    }),
    expenditureCreate: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { particulars, amount, date, paymentMode, remarks, department } = req.body;
        const data = await adminService.expenditureCreate(particulars, amount, date, paymentMode, remarks, department);
        res.status(200).json({ data });
    }),
    eventManagementCreate: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { event, date, budgetAllocated, budgetUsed, organizer, remarks, department } = req.body;
        const data = await adminService.eventManagementCreate(event, date, budgetAllocated, budgetUsed, organizer, remarks, department);
        res.status(200).json({ data });
    }),

    getAllExpenditureForDuration: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { department, FromDate, ToDate } = req.body;

        const data = await adminService.getAllExpenditureForDuration(department, FromDate, ToDate);
        res.status(200).json({ data });
    }),

    createOneAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, adminType, access } = req.body;
        console.log(name, email, password, adminType, access, 'data');
        const { user, token } = await authService.signUp(name, email, password, false, adminType, access);
        res.status(200).json({ user, token });
    }),

    loginAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, adminType } = req.body;
        console.log(req.body, 'req.body');
        const { user, token } = await authService.login(email, password, adminType);
        res.status(200).json({ user, token });
    }),

    forgotPasswordSuperAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await authService.forgotpassword(req.body.email);
        res.status(200).json({ message: 'Please check your email !' });
    }),

    forgotPasswordAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await authService.forgotpassword(req.body.email);
        res.status(200).json({ message: 'Please check your email !' });
    }),

    resetpassword: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await authService.resetpassword(req.params.id, req.params.token, req.body.password);
        res.status(200).json({ message: 'Password updated successfully !' });
    }),

    logout: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await authService.logout(req.admin, req.body.token);
        res.status(200).json({ message: 'Logout successfully' });
    }),

    logoutAll: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await authService.logoutAll(req.admin);
        res.status(200).json({ message: 'Logout from all devices' });
    }),

    createDepartment: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { departmentName, classes, section } = req.body;
        const data = await adminService.createDepartment(req.body);
        res.status(200).json(data);
    }),

    //get
    getAllAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.getAllAdmin();
        res.status(200).json({
            data
        });
    }),

    getAllExpenditure: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.getAllExpenditure(req.params.id);
        res.status(200).json({
            data
        });
    }),

    getAllEventManagement: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.getAllEventManagement(req.params.id);
        res.status(200).json({
            data
        });
    }),
    oneAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.oneAdmin(req.params.id);
        res.status(200).json({
            data
        });
    }),
    adminProfile: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.adminProfile(req.params.id);
        res.status(200).json({
            data
        });
    }),

    superAdminProfile: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = await adminService.superAdminProfile(id);
        res.status(200).json({
            data
        });
    }),

    getAllDepartments: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.getAllDepartments();
        res.status(200).json({
            data
        });
    }),

    getOneDepartments: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.getOneDepartments(req.body.name);
        res.status(200).json({
            data
        });
    }),

    //delete
    deleteAllAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.deleteAllAdmin(req.body.deleteAdmins);
        res.status(200).json({
            data
        });
    }),

    expenditureDelete: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, 'body');
        const data = await adminService.expenditureDelete(req.params.id, req.body.department);
        res.status(200).json(data);
    }),

    eventManagementDelete: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.eventManagementDelete(req.params.id, req.body.department);
        res.status(200).json(data);
    }),
    deleteOneAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.deleteOneAdmin(req.params.id);
        res.status(200).json({
            data
        });
    }),

    DeleteOneDepartments: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.DeleteOneDepartments(req.body.name);
        res.status(200).json({
            data
        });
    }),

    //patch
    updateOneAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.updateOneAdmin(req.params.id, req.body.data);
        res.status(200).json({
            data
        });
    }),

    changeCredentialsSuperAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.changeCredentialsSuperAdmin(req.params.id, req.body.password, req.body.email);
        res.status(200).json({
            data
        });
    }),

    changeCredentialsAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.changeCredentialsAdmin(req.params.id, req.body.password, req.body.email);
        res.status(200).json({
            data
        });
    }),

    updateProfileSuperAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.updateProfileSuperAdmin(req.params.id, req.body.data);
        res.status(200).json({
            data
        });
    }),

    updateProfileAdmin: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.updateProfileAdmin(req.params.id, req.body.data);
        res.status(200).json({
            data
        });
    }),

    updateOneDepartments: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data = await adminService.updateOneDepartments(req.body.updateDatas, req.body.name);
        res.status(200).json({
            data
        });
    }),
    expenditureEdit: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { particulars, amount, date, paymentMode, remarks, department } = req.body;
        const data = await adminService.expenditureEdit(particulars, amount, date, paymentMode, remarks, department, req.params.id);
        res.status(200).json({
            data
        });
    }),

    eventManagementEdit: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { event, date, budgetAllocated, budgetUsed, organizer, remarks, department } = req.body;
        const data = await adminService.eventManagementEdit(event, date, budgetAllocated, budgetUsed, organizer, remarks, department, req.params.id);
        res.status(200).json({
            data
        });
    })
};

export default adminController;
