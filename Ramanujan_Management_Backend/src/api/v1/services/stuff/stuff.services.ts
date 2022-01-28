import { isValid } from '../../utils/isValid';
import { stuff, stuff_attendance, SalarySlipDocument } from '../../models';
import MailService from '../externalService/email.service';
import { Model, Document } from 'mongoose';

class StuffService {
    private _Stuff_model;
    private _Mailservice;
    private _SalarySlipModel;
    private _Stuff_attendance_Model;
    constructor({
        StuffModel,
        MailService,
        SalarySlipModel,
        Stuff_attendance_Model
    }: {
        StuffModel: Model<stuff>;
        MailService: MailService;
        SalarySlipModel: Model<SalarySlipDocument>;
        Stuff_attendance_Model: Model<stuff_attendance>;
    }) {
        this._Stuff_model = StuffModel;
        this._Mailservice = MailService;
        this._SalarySlipModel = SalarySlipModel;
        this._Stuff_attendance_Model = Stuff_attendance_Model;
    }
    toJson(user: any) {
        const userObj = user.Object();
        delete userObj.password;
        delete userObj.token;
        return userObj;
    }

    async getLastId(id: string) {
        const res = await this._Stuff_model.find(
            {
                designation: id
            },
            {
                _id: true
            }
        );

        return res.length;
    }

    // creating new stuff data base
    //@post request
    async create_new_stuff_id(
        snap_shot: String,
        idNo: String,
        biometric_code: String,
        DOB: Date,
        name: String,
        gender: Number,
        address: String,
        mobileNo: Number,
        email: String,
        joining_Date: Date,
        designation: String,
        maritial_Status: Number,
        blood_grp: Number,
        leave_application_date: Array<Date>,
        leave_application_name: Array<String>,
        leave_application_reason: Array<String>
    ) {
        try {
            const data = await this._Stuff_model.create({
                snap_shot,
                idNo,
                biometric_code,
                DOB,
                name,
                gender,
                address,
                mobileNo,
                email,
                joining_Date,
                designation,
                maritial_Status,
                blood_grp,
                leave_application_date,
                leave_application_name,
                leave_application_reason
            });

            return data;
        } catch (e) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'OPPS Unable to create new teacher id , please try again';
            throw error;
        }
    }
    async salarySlipCreate(
        stuff_id,
        basicPay,
        DA,
        HRA,
        conveyance,
        otherAllowance,
        grossSalary,
        PF,
        ESI,
        loanDeduction,
        professionalTax,
        absentPenalty,
        advancedSalary,
        TDSIT,
        netSalary,
        paymentMethod,
        department,
        year,
        month
    ) {
        try {
            const data = await this._SalarySlipModel.create({
                stuff_id,
                basicPay,
                DA,
                HRA,
                conveyance,
                otherAllowance,
                grossSalary,
                PF,
                ESI,
                loanDeduction,
                professionalTax,
                absentPenalty,
                advancedSalary,
                TDSIT,
                netSalary,
                paymentMethod,
                department,
                year,
                month
            });
            console.log(data, 'data');
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `unable to assign salary `;
            throw error;
        }
    }

    /** @Post */

    async getAllStuffPaymentForDuration(details: any) {
        let loop = new Date(details.ToDate);

        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);

        const data = await this._SalarySlipModel
            .find(
                {
                    createdAt: {
                        $gte: new Date(details.FromDate).toISOString(),
                        $lte: loop.toISOString()
                    },
                    department: details.department
                },
                {
                    netSalary: true,
                    department: true,
                    createdAt: true
                }
            )
            .populate('stuff_id', 'name');

        return data;
    }

    async allStuffAttendence(data: any) {
        try {
            const existing = await this._Stuff_attendance_Model.findOne({
                date: data.date,
                department: data.department
            });

            if (existing) {
                await this._Stuff_attendance_Model.findByIdAndUpdate(existing._id, data);

                return {
                    error: 'Attendence data updated',
                    existing: data
                };
            }

            const stuffs = await this._Stuff_attendance_Model.create({
                ...data
            });
            return stuffs;
        } catch (error) {
            throw new Error();
        }
    }

    /** @Get */

    async getStuffAttendence(data: any) {
        try {
            const existing = await this._Stuff_attendance_Model.findOne({
                date: data.date,
                department: data.department
            });

            if (!existing) {
                return {
                    error: 'Not data found for this corresponding Date'
                };
            }

            return existing;
        } catch (error) {
            throw new Error();
        }
    }

    /** @Get */

    async getOneStuffAttendance(requestedDetails: any) {
        try {
            const details = JSON.parse(requestedDetails);

            let loop = new Date(details.From_Date),
                data;

            let attendenceList: any = [];

            while (loop <= new Date(details.To_Date)) {
                data = await this._Stuff_attendance_Model.findOne({
                    date: loop.toISOString(),
                    department: details.department
                });

                data?.stuffs.map((stuff) => (stuff.stuff_id == details.Stuff ? attendenceList.push({ present: stuff.present, date: loop.toISOString().split('T')[0] }) : null));

                var newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }

            return attendenceList;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'No Students found ';
            throw error;
        }
    }

    // @get request
    async getAllStuff(id: string) {
        try {
            const data = await this._Stuff_model
                .find({
                    designation: id
                })
                .populate('designation', 'departmentName');

            console.log(data, 'data');
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            throw error;
        }
    }

    // @get request
    async getAllStuffDepartment(id: any) {
        try {
            const data = await this._Stuff_model.find({
                designation: id
            });
            // this.toJson()
            return data;
        } catch (e) {
            const error: any = new Error();
            throw error;
        }
    }

    async salarySlipGetAll(departmentId: string) {
        const data = await this._SalarySlipModel.find({ department: departmentId }).populate('stuff_id');
        console.log(data, 'data');
        return data;
    }

    async salarySlipGetOne(departmentId: string, id: string) {
        const data = await this._SalarySlipModel
            .find({})
            .populate({
                path: 'Stuff',
                department: departmentId,
                _id: id
            })
            .exec();
        return data;
    }
    // @get request
    async getOneSuff(id: string) {
        try {
            const data = await this._Stuff_model.findById(id);
            // this.toJson()
            return data;
        } catch (e) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Stuff not found';
            throw error;
        }
    }

    // @patch request
    async editOneStuff(id: string, dataUpdate: object) {
        try {
            const data = await this._Stuff_model.findByIdAndUpdate(id, dataUpdate);
            return data;
        } catch (e) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update the Stuff of id ${id}`;
            throw error;
        }
    }

    async salarySlipEditOne(dataSalary: object, id: string) {
        const data = await this._SalarySlipModel.findByIdAndUpdate(id, {
            ...dataSalary
        });

        return data;
    }
    // @delete request
    async deleteOneStuff(id: string) {
        try {
            const data = await this._Stuff_model.findByIdAndDelete(id);

            await this._SalarySlipModel.deleteMany({
                stuff_id: id
            });

            return data;
        } catch (e) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to delete the stuff of id ${id}`;
            throw error;
        }
    }
    async salarySlipDeleteOne(id: string) {
        const data = await this._SalarySlipModel.findByIdAndDelete(id);
        return data;
    }
}
export default StuffService;
