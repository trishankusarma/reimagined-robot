import {
    EventMangementDocument,
    AdminDocument,
    ExpenditureDocument,
    Department,
    DepartmentModel,
    StuffModel,
    StudentModelCollege,
    EventMangementModel,
    ExpenditureModel,
    SalarySlipModel,
    FeePaymentModel,
    CashBookModel
} from '../models';

import { Model } from 'mongoose';
import MailService from './externalService/email.service';

/**
 *
 *  @Adminservice by Jitul Teron
 *
 **/

class AdminService {
    private _AdminModel;
    private _DepartmentModel;
    private _MailService;
    private _ExpenditureModel;
    private _EventMangementModel;

    constructor({
        AdminModel,
        MailService,
        DepartmentModel,
        ExpenditureModel,
        EventMangementModel
    }: {
        AdminModel: Model<AdminDocument>;
        DepartmentModel: Model<Department>;
        MailService: MailService;
        ExpenditureModel: Model<ExpenditureDocument>;
        EventMangementModel: Model<EventMangementDocument>;
    }) {
        this._AdminModel = AdminModel;
        this._MailService = MailService;
        this._DepartmentModel = DepartmentModel;
        this._ExpenditureModel = ExpenditureModel;
        this._EventMangementModel = EventMangementModel;
    }

    toJson(user: any) {
        const userObj = user.Object();
        delete userObj.password;
        delete userObj.token;
        return userObj;
    }

    /** @get */
    async getIntitialValues(_id: any) {
        try {
            const students = await StudentModelCollege.find(
                {
                    stream: _id
                },
                {
                    _id: true
                }
            );

            const stuffs = await StuffModel.find(
                {
                    designation: _id
                },
                {
                    _id: true
                }
            );

            const lastUpdated = await CashBookModel.find({
                department: _id
            })
                .sort({ _id: -1 })
                .limit(1);

            console.log('last updated', lastUpdated);

            return {
                Students: students?.length,
                Staff: stuffs?.length,
                Earnings: lastUpdated.length == 0 ? 0 : lastUpdated
            };
        } catch (e: any) {
            console.log(e);

            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to get data`;
            throw error;
        }
    }

    /**@Post */
    async getAllEventManagementDuration(department: string, FromDate: Date, ToDate: Date) {
        try {
            let loop = new Date(FromDate),
                data;

            let list: any = [];

            while (loop <= new Date(ToDate)) {
                data = await this._EventMangementModel.find({
                    date: loop,
                    department: department
                });

                if (data) {
                    list = [...list, ...data];
                }

                var newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }

            return list;
        } catch (e: any) {
            const error: any = new Error(e);
            error.Status = 400;
            throw error;
        }
    }

    async createDepartment(department: object) {
        try {
            const data = await this._DepartmentModel.create(department);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.Status = 400;
            throw error;
        }
    }

    async expenditureCreate(particulars, amount, date, paymentMode, remarks, department) {
        try {
            await this._ExpenditureModel.create({
                particulars,
                amount,
                date,
                paymentMode,
                remarks,
                department
            });
            const data = await this._ExpenditureModel.find({ department: department });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to create expenditure`;
            throw error;
        }
    }

    async eventManagementCreate(event, date, budgetAllocated, budgetUsed, organizer, remarks, department) {
        try {
            await this._EventMangementModel.create({
                event,
                date,
                budgetAllocated,
                budgetUsed,
                organizer,
                remarks,
                department
            });
            const data = await this._EventMangementModel.find({ department: department });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to create event budget`;
            throw error;
        }
    }
    /** @Get */
    async getAllDepartments() {
        try {
            const data = await this._DepartmentModel.find({});
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.Status = 400;
            throw error;
        }
    }
    async getAllExpenditure(id) {
        try {
            console.log(id, 'id');
            const data = await this._ExpenditureModel.find({ department: id });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.Status = 400;
        }
    }

    async getAllExpenditureForDuration(department: string, FromDate: Date, ToDate: Date) {
        console.log('expenditure', department, FromDate, ToDate);
        try {
            let loop = new Date(FromDate),
                data;

            let list: any = [];

            while (loop <= new Date(ToDate)) {
                data = await this._ExpenditureModel.find({
                    date: loop.toISOString().split('T')[0],
                    department: department
                });

                if (data) {
                    list = [...list, ...data];
                }

                var newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }

            return { payment: list };
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Unexpected error occured';
            throw error;
        }
    }

    async getAllEventManagement(id) {
        try {
            console.log(id, 'id');
            const data = await this._EventMangementModel.find({ department: id });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.Status = 400;
            throw error;
        }
    }
    async getOneDepartments(name: string) {
        try {
            const data = await this._DepartmentModel.findOne({ name: name });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.Status = 400;
            throw error;
        }
    }
    async getAllAdmin() {
        try {
            const data = await this._AdminModel.find({}).populate('adminType');
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            throw error;
        }
    }
    async oneAdmin(id: string) {
        try {
            const data = await this._AdminModel.findById(id);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Admin not found';
            throw error;
        }
    }
    async adminProfile(id: string) {
        try {
            const data = await this._AdminModel.findById(id);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Admin not found';
            throw error;
        }
    }

    async superAdminProfile(id: string) {
        try {
            const data = await this._AdminModel.findById(id);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Super Admin not found';
            throw error;
        }
    }
    /** @Delete */

    async deleteAllAdmin(arr: Array<any>) {
        try {
            const data = await this._AdminModel.deleteMany({
                _id: { $in: arr }
            });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Unable to delete the list of admins';
            throw error;
        }
    }
    async deleteOneAdmin(id: string) {
        try {
            const data = await this._AdminModel.findByIdAndDelete(id);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to delete the admin of id ${id}`;
            throw error;
        }
    }
    async DeleteOneDepartments(name: string) {
        try {
            const data = await this._DepartmentModel.findOneAndDelete({ name: name });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.Status = 400;
            throw error;
        }
    }

    async expenditureDelete(id, department) {
        try {
            console.log(department, 'department');
            const deletedData = await this._ExpenditureModel.findByIdAndDelete(id);

            const data = await this._ExpenditureModel.find({ department: department });
            return { data, deletedData };
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete expenditure`;
            throw error;
        }
    }

    async eventManagementDelete(id, department) {
        try {
            console.log(id, department, 'department');
            let result = await this._EventMangementModel.findByIdAndDelete(id);
            const data = await this._EventMangementModel.find({ department: department });
            console.log(result, 'data');
            return { result, data };
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete expenditure`;
            throw error;
        }
    }
    /** @Patch */
    async updateOneDepartments(updateDatas: object, name: string) {
        try {
            const data = await this._DepartmentModel.findOneAndUpdate(
                { name: name },
                {
                    ...updateDatas
                }
            );
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.Status = 400;
            throw error;
        }
    }
    async updateOneAdmin(id: string, dataUpdate: object) {
        try {
            const data = await this._AdminModel.findByIdAndUpdate(id, dataUpdate);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update the admin of id ${id}`;
            throw error;
        }
    }
    async changeCredentialsSuperAdmin(id: string, password: string, email: string) {
        try {
            const data = await this._AdminModel.findByIdAndUpdate(id, { password, email });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update credentails super admin`;
            throw error;
        }
    }
    async changeCredentialsAdmin(id: string, password: string, email: string) {
        try {
            const data = await this._AdminModel.findByIdAndUpdate(id, { password, email });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update credentails admin of id ${id}`;
            throw error;
        }
    }

    async updateProfileSuperAdmin(id: string, dataUpdate: object) {
        try {
            const data = await this._AdminModel.findByIdAndUpdate(id, dataUpdate);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update super admin of id ${id}`;
            throw error;
        }
    }

    async updateProfileAdmin(id: string, dataUpdate: object) {
        try {
            const data = await this._AdminModel.findByIdAndUpdate(id, dataUpdate);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update the admin of id ${id}`;
            throw error;
        }
    }

    async expenditureEdit(particulars, amount, date, paymentMode, remarks, department, id) {
        try {
            console.log(particulars, amount, date, paymentMode, remarks, department, 'Asdasd');
            await this._ExpenditureModel.findByIdAndUpdate(id, {
                particulars,
                amount,
                date,
                paymentMode,
                remarks,
                department
            });

            const data = await this._ExpenditureModel.find({ department: department });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to edit expenditure`;
            throw error;
        }
    }

    async eventManagementEdit(event, date, budgetAllocated, budgetUsed, organizer, remarks, department, id) {
        try {
            await this._EventMangementModel.findByIdAndUpdate(id, {
                event,
                date,
                budgetAllocated,
                budgetUsed,
                organizer,
                remarks,
                department
            });

            const data = await this._EventMangementModel.find({ department: department });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to edit expenditure`;
            throw error;
        }
    }
}

export default AdminService;
