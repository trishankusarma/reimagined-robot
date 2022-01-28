import { StudentDocumentCollege } from '../models/college/students/students_college.model';
import { StudentDocumentCoaching } from '../models/coaching/students/students_coaching.model';
import {
    FeeInstanceModel,
    Student_hostel_admission_Model,
    student_attendance,
    student_marks_document,
    LeaveApplication,
    FeePaymentDocument,
    StudentModelCollege,
    FeeInstanceDocument
} from '../models';

import { Model } from 'mongoose';
import MailService from './externalService/email.service';
import MessageService from './externalService/message.service';
import XLSX from 'xlsx';
import moment from 'moment';

let sendMessage = new MessageService();

/**
 *
 *  @Adminservice by Jitul Teron
 *
 **/

class AdminService {
    private StudentModelCollege;
    private _MailService;
    private StudentModelCoaching;
    private Leave_Application_Model;
    private FeePaymentModel;
    private _Student_marks_Model;
    private _Student_attendance_Model;
    private FeeInstanceModel;

    constructor({
        StudentModelCollege,
        StudentModelCoaching,
        Leave_Application_Model,
        FeePaymentModel,
        Student_marks_Model,
        Student_attendance_Model,
        FeeInstanceModel,
        MailService
    }: {
        StudentModelCollege: Model<StudentDocumentCollege>;
        StudentModelCoaching: Model<StudentDocumentCoaching>;
        Student_marks_Model: Model<student_marks_document>;
        Leave_Application_Model: Model<LeaveApplication>;
        Student_attendance_Model: Model<student_attendance>;
        MailService: MailService;
        FeePaymentModel: Model<FeePaymentDocument>;
        FeeInstanceModel: Model<FeeInstanceDocument>;
    }) {
        this.StudentModelCollege = StudentModelCollege;
        this._MailService = MailService;
        this.Leave_Application_Model = Leave_Application_Model;
        this.StudentModelCoaching = StudentModelCoaching;
        this.FeePaymentModel = FeePaymentModel;
        this.FeeInstanceModel = FeeInstanceModel;
        this._Student_marks_Model = Student_marks_Model;

        this._Student_attendance_Model = Student_attendance_Model;
    }
    async getAllStudentExam(Session: Number, Class: Number, Section: String) {
        try {
            const data = await this._Student_marks_Model
                .find({
                    Session,
                    Class,
                    Section
                })
                .populate('Student_id', 'name rollNo');

            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = e;
            throw error('Unable to extract data');
        }
    }
    async excelSheetExtractor(fileName: string) {
        try {
            const workbook = XLSX.readFile(`${__dirname}/${fileName}`);
            var data: any = [];
            var info = null;
            var sheet_name_lists = workbook.SheetNames;
            sheet_name_lists.forEach(function (y) {
                var worksheet = workbook.Sheets[y];
                var headers: any = {};

                for (var z in worksheet) {
                    if (z[0] === '!') continue;

                    var tt = 0;
                    for (var i = 0; i < z.length; i++) {
                        if (z[i] !== null && z[i] !== undefined && z[i] !== '') {
                            tt = i;
                            break;
                        }
                    }
                    var col = z.substring(0, tt);
                    var row = parseInt(z.substring(tt));
                    var value = worksheet[z].v;

                    if (row == 1 && value) {
                        headers[col] = value;
                        continue;
                    }

                    if (!data[row]) data[row] = {};
                    data[row][headers[col]] = value;
                }
                //drop those first two rows which are empty
                data.shift();
                data.shift();

                info = data;
            });
            return info;
        } catch (e: any) {
            console.log(e, 'error');
            throw new Error('Unable to extract data');
        }
    }

    /** @Post */

    async allStudentAttendence(data: any) {
        try {
            const existing = await this._Student_attendance_Model.findOne({
                date: data.date,
                class: data.class,
                sec: data.sec,

                department: data.department
            });

            if (existing) {
                await this._Student_attendance_Model.findByIdAndUpdate(existing._id, data);

                return {
                    error: 'Attendence data updated',
                    existing: data
                };
            }

            const students = await this._Student_attendance_Model.create({
                ...data
            });
            return students;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = e;
            throw error;
        }
    }

    /** @Get */

    async getAllStudentAttendence(data: any) {
        try {
            const existing = await this._Student_attendance_Model.findOne({
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

    async oneStudentAdmissionCollege(data: any) {
        try {
            const student = await this.StudentModelCollege.create({
                ...data,
                paidAmountPermatent: data.paidAmount
            });
            await sendMessage.sendMessage([data?.mobileNo], 'Admission complete');
            return student;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async oneStudentAdmissionCoaching(data: object) {
        try {
            const student = await this.StudentModelCoaching.create({
                ...data
            });
            return student;
        } catch (error) {
            throw new Error();
        }
    }

    async updloadExcelSheet(filename: string) {
        let sheetData = this.excelSheetExtractor(filename);

        console.log(sheetData, 'sheetData');
    }

    async leaveApplication(type: boolean, From_Date: string, To_date: string, Reason: string, partOf: string) {
        const data = await this.Leave_Application_Model.create({
            type,
            From_Date,
            To_date,
            Reason,
            partOf
        });
        return data;
    }

    async getStudentMarks(exam: String, _id: String) {
        const res = await this._Student_marks_Model.findOne({
            Exam: exam,
            Student_id: _id
        });
        return res;
    }

    async createStudentMarks(studentData: object) {
        const data = await this._Student_marks_Model.create({ ...studentData });
        return studentData;
    }

    async editStudentMarks(dataUpdate: object, Exam: String, Student_id: Number) {
        const res = await this._Student_marks_Model.findOne({
            Exam,
            Student_id
        });

        if (!res) {
            return {
                error: 'No student with this exist!!'
            };
        }

        await this._Student_marks_Model.findByIdAndUpdate(res._id, dataUpdate);
        return dataUpdate;
    }

    /** @Get */
    async oneStudentsFee(number, department) {
        try {
            const data = await this.StudentModelCollege.findOne({
                stream: department,
                rollNo: number
            });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student not found';
            throw error;
        }
    }

    async getStudentAttendence(requestedDetails: any) {
        try {
            const details = JSON.parse(requestedDetails);

            let loop = new Date(details.From_Date),
                data;

            let attendenceList: any = [];

            while (loop <= new Date(details.To_Date)) {
                data = await this._Student_attendance_Model.findOne({
                    date: loop.toISOString(),
                    class: details.Class,
                    sec: details.Section,
                    department: details.department
                });

                data?.students.map((student) => (student.student_id == details.Student ? attendenceList.push({ present: student.present, date: loop.toISOString().split('T')[0] }) : null));

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

    async allStudentsCollege(id: string) {
        try {
            let year, date1, date2;
            year = new Date().getFullYear();
            date1 = new Date(year, 0, 1);
            date2 = new Date(year, 11, 30);
            const data = await this.StudentModelCollege.find({
                stream: id
            });
            console.log(data.length);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'No Students school ';
            throw error;
        }
    }

    async allStudentsOfDepartment(id: string) {
        try {
            const data = await this.StudentModelCollege.find(
                {
                    stream: id
                },
                {
                    name: true,
                    address: true,
                    mobileNo: true,
                    email: true,
                    session: true,
                    standard: true,
                    admissionNo: true,
                    section: true,
                    bioCode: true,
                    rollNo: true
                }
            );
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'No Students school ';
            throw error;
        }
    }

    async allStudentsCoaching() {
        try {
            const data = await this.StudentModelCoaching.find({});

            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'No Students coaching ';
            throw error;
        }
    }
    async oneStudentsCollege(id: string) {
        try {
            const data = await this.StudentModelCollege.findById(id);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }

    async oneStudentsCollegeWithMarks(id: string) {
        try {
            const data = await this.StudentModelCollege.findById(id).populate('stream', 'departmentName');

            const marksData = await this._Student_marks_Model.find({
                Student_id: id
            });
            return { data, marksData };
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }

    async oneStudentsCoaching(id: string) {
        try {
            const data = await this.StudentModelCoaching.findById(id);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }
    async leaveApplicationAllOne(type: boolean, id: string, partOf: string) {
        const data = await this.Leave_Application_Model.find({ type, partOf });
        return data;
    }
    async leaveApplicationOne(type: boolean, id: string, partOf: string) {
        const data = await this.Leave_Application_Model.findOne({ type, partOf, _id: id });
        return data;
    }
    /** @Delete */

    async deleteAllStudentsCollege(arr: Array<any>) {
        try {
            const data = await this.StudentModelCollege.deleteMany({
                _id: { $in: arr }
            });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Unable to delete the list of students fron college';
            throw error;
        }
    }
    async deleteAllStudentsCoaching(arr: Array<any>) {
        try {
            const data = await this.StudentModelCoaching.deleteMany({
                _id: { $in: arr }
            });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Unable to delete the list of students fron coaching';
            throw error;
        }
    }
    async deleteOneStudentCollege(id: string, department: string) {
        try {
            const delStudent = await this.StudentModelCollege.findByIdAndDelete(id);

            await this.FeePaymentModel.deleteMany({
                department: department,
                student: id
            });

            await this.FeeInstanceModel.deleteMany({
                department: department,
                student: id
            });

            await Student_hostel_admission_Model.deleteMany({
                department: department,
                student: id
            });

            const data = await this.StudentModelCollege.find({
                stream: department
            });
            return { data, delStudent };
        } catch (e: any) {
            console.log(e);

            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to delete the student of id ${id}`;
            throw error;
        }
    }
    async oneStudentCoaching(id: string) {
        try {
            const data = await this.StudentModelCoaching.findByIdAndDelete(id);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to delete the student from coaching of id ${id}`;
            throw error;
        }
    }

    async leaveApplicationDelete(type: boolean, id: string, partOf: string) {
        const data = await this.Leave_Application_Model.findOneAndDelete({ type, partOf, _id: id });
        return data;
    }
    /** @Patch */

    async updateOneStudentCollege(id: string, dataUpdate: object) {
        try {
            console.log(dataUpdate, 'dataUpdate');
            const data = await this.StudentModelCollege.findByIdAndUpdate(id, {
                ...dataUpdate
            });
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update the student of id ${id}`;
            throw error;
        }
    }
    async updateOneStudentCoaching(id: string, dataUpdate: object) {
        try {
            const data = await this.StudentModelCoaching.findByIdAndUpdate(id, dataUpdate);
            return data;
        } catch (e: any) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = `Unable to update the student from coaching  of id ${id}`;
            throw error;
        }
    }

    /// fee payment CRUD
    //get
    async oneStudentsCollegeForFee(department: string, No: string) {
        try {
            console.log(department, No, 'rollNo');
            const data = await this.StudentModelCollege.findOne({
                stream: department,
                admissionNo: No
            });
            console.log(data, 'data');
            if (!data) {
                return { error: 'Student from college not found!' };
            }

            const payment = await this.FeePaymentModel.findOne({
                department: department,
                student: data._id
            }).populate('previousPayment.instance otherPayment.instance');

            return { data, payment };
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }

    async hostelFind(No, department) {
        try {
            const data = await this.StudentModelCollege.findOne({
                admissionNo: No
            });
            console.log(data, 'data');
            if (!data) {
                return { error: 'Student from college not found!' };
            }
            const payment = await this.FeePaymentModel.findOne({
                department: department,
                student: data._id
            });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }

    async allStudentsCollegeFee(department: string, FromDate: Date, ToDate: Date) {
        console.log('payment', department, FromDate, ToDate);

        try {
            const rows = await this.FeePaymentModel.find({
                department: department
            }).populate('student', 'admissionNo');

            let payment: any = [];

            await rows.forEach((element) => {
                element.previousPayment.forEach((e) => {
                    if (
                        moment(e.date, 'YYYY-MM-DD').format('YYYY-MM-DD') >= moment(FromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') &&
                        moment(e.date, 'YYYY-MM-DD').format('YYYY-MM-DD') <= moment(ToDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
                    ) {
                        payment = [
                            ...payment,
                            {
                                date: e.date,
                                reason: `${e.particular} ( ${e.paymentMode} ) : enrollmentNo: ${element.student?.admissionNo}`,
                                amount: parseInt(e.amount)
                            }
                        ];
                    }
                });

                element.otherPayment.forEach((e) => {
                    if (
                        moment(e.date, 'YYYY-MM-DD').format('YYYY-MM-DD') >= moment(FromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') &&
                        moment(e.date, 'YYYY-MM-DD').format('YYYY-MM-DD') <= moment(ToDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
                    ) {
                        payment = [
                            ...payment,
                            {
                                date: e.date,
                                amount: parseInt(e.amount),
                                reason: `${e.particular} ( ${e.paymentMode} ) : enrollmentNo: ${element.student?.admissionNo}`
                            }
                        ];
                    }
                });
            });

            const admissions = await StudentModelCollege.find(
                {
                    stream: department
                },
                {
                    paymentMode: true,
                    admissionNo: true,
                    extraPay: true,
                    paidAmount: true,
                    paidAmountPermatent: true,
                    createdAt: true
                }
            );

            await admissions.forEach((e: any) => {
                let admittedDate = e.createdAt;

                if (
                    moment(admittedDate, 'YYYY-MM-DD').format('YYYY-MM-DD') >= moment(FromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') &&
                    moment(admittedDate, 'YYYY-MM-DD').format('YYYY-MM-DD') <= moment(ToDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
                ) {
                    payment = [
                        ...payment,
                        {
                            date: moment(admittedDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                            reason: `Admission Done for enrollmentNo: ${e.admissionNo} ( ${e.paymentMode}) `,
                            amount: `${parseInt(e.paidAmountPermatent)}`
                        }
                    ];
                }
            });

            const hostel_admissions = await Student_hostel_admission_Model.find(
                {
                    department: department
                },
                {
                    enrollment_no: true,
                    admissionPaidPermatent: true,
                    Admission_Date: true
                }
            );

            await hostel_admissions.forEach((e: any) => {
                let admittedDate = e.Admission_Date;

                if (
                    moment(admittedDate, 'YYYY-MM-DD').format('YYYY-MM-DD') >= moment(FromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') &&
                    moment(admittedDate, 'YYYY-MM-DD').format('YYYY-MM-DD') <= moment(ToDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
                ) {
                    payment = [
                        ...payment,
                        {
                            date: moment(e.Admission_Date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
                            reason: `Hostel Admission Payment for enrollmentNo: ${e.enrollment_no} `,
                            amount: `${parseInt(e.admissionPaidPermatent)}`
                        }
                    ];
                }
            });

            return { payment };
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Unexpected error occured';
            throw error;
        }
    }
    //post;

    async studentPayment(info, department, student, departmentName) {
        try {
            console.log(info.hostel, student, departmentName);
            let instance = await FeeInstanceModel.create({
                department: department,
                student: student,
                date: info.paymentDate,
                reciept: info.receiptNo,
                hostel: departmentName ? 1 : 0,
                instance: {
                    Amount_paid: info.payNow,
                    admissionFee: info.admissionFee,
                    programeFee: info.programFee,
                    Paid_Admission_Amount: info.totPaidAdmission,
                    BalanceAdmissionAmount: info.admissionBalanceAmount,
                    Total_Paid: info.paidAmount,
                    Balance_left: info.balanceAmount,
                    Payment_Type: info.paymentType,
                    Monthly: info?.monthlyFees
                }
            });

            let studnet = await this.FeePaymentModel.findOne({
                student: student,
                department: department
            });

            if (studnet !== null) {
                let result = await this.FeePaymentModel.findOneAndUpdate(
                    {
                        student: student,
                        hostel: departmentName ? true : false
                    },
                    {
                        $push: {
                            previousPayment: {
                                instance: instance._id,
                                date: info.paymentDate,
                                particular:
                                    info.paymentType == 'Admission'
                                        ? `${info.paymentType} fees ${info.month}  ${info.year}`
                                        : departmentName == 'Hostel'
                                        ? `Hostel ${info.paymentType} fees ${info.month}  ${info.year}`
                                        : `Tution ${info.paymentType} fees ${info.month}  ${info.year}`,
                                amount: parseInt(info.payNow),
                                paymentMode: info.paymentMode
                            }
                        }
                    }
                );
                instance.payment = result._id;
                await instance.save();
            } else {
                let result = await this.FeePaymentModel.create({
                    hostel: departmentName ? 1 : 0,
                    previousPayment: [
                        {
                            instance: instance._id,
                            date: info.paymentDate,
                            particular:
                                info.paymentType == 'Admission'
                                    ? `${info.paymentType} fees ${info.month}  ${info.year}`
                                    : departmentName == 'Hostel'
                                    ? `Hostel ${info.paymentType} fees ${info.month}  ${info.year}`
                                    : `Tution ${info.paymentType} fees ${info.month}  ${info.year}`,
                            amount: parseInt(info.payNow),
                            paymentMode: info.paymentMode
                        }
                    ],

                    department: department,
                    student: student
                });
                instance.payment = result._id;
                await instance.save();
            }
            let studentInfo;
            if (departmentName == 'Hostel') {
                studentInfo = await Student_hostel_admission_Model.findOne({ student: student }).populate('student');

                if (info.paymentType == 'Admission' || info.paymentType == 'Installment') {
                    studentInfo!.admissionPaid = studentInfo?.admissionPaid + info.payNow;
                    studentInfo!.paidAmount = studentInfo?.paidAmount + info.payNow;
                    await studentInfo!.save();
                } else if (info.paymentType == 'Monthly') {
                    studentInfo!.paidAmount = studentInfo?.paidAmount + info.payNow;
                    await studentInfo!.save();
                }
            } else {
                studentInfo = await this.StudentModelCollege.findById(student);

                if (info.paymentType == 'Admission' || info.paymentType == 'Installment') {
                    console.log(studentInfo.paidAmount, studentInfo.admissionPaid, 'part 1');
                    studentInfo!.paidAmount = studentInfo.paidAmount + info.payNow;
                    studentInfo!.admissionPaid = studentInfo.admissionPaid + info.payNow;
                    await studentInfo.save();
                    console.log(studentInfo.paidAmount, studentInfo.admissionPaid, 'part 2');
                } else if (info.paymentType == 'Monthly') {
                    let testing2 = await this.StudentModelCollege.findByIdAndUpdate(student, {
                        ...info,
                        paidAmount: studentInfo.paidAmount + info.payNow
                    });
                }
            }

            let data;

            let studentData;
            if (departmentName == 'Hostel') {
                studentData = await Student_hostel_admission_Model.findOne({ student: student }).populate('student');
                data = await this.FeePaymentModel.find({
                    department: department,
                    hostel: true,
                    student: student
                }).populate('student');
            } else {
                studentData = await this.StudentModelCollege.findById(student);
                data = await this.FeePaymentModel.find({
                    department: department,
                    student: student
                });
            }

            await sendMessage.sendMessage([studnet?.mobileNo], 'Msg template when given');

            return { data, studentData };
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }

    // async xxx(info, department, student, departmentName) {
    //     try {
    //         let studentInfo;
    //         if (departmentName == 'Hostel') {
    //             studentInfo = await Student_hostel_admission_Model.findOne({ student: student }).populate('student');

    //             if (info.paymentType == 'Admission') {
    //                 studentInfo!.admissionPaid = studentInfo?.admissionPaid - info.payNow;
    //                 studentInfo!.paidAmount = studentInfo?.paidAmount - info.payNow;
    //                 await studentInfo!.save();
    //             } else if (info.paymentType == 'Installment' || info.paymentType == 'Monthly') {
    //                 studentInfo!.paidAmount = studentInfo?.paidAmount - info.payNow;
    //                 await studentInfo!.save();
    //             }
    //         } else {
    //             studentInfo = await this.StudentModelCollege.findById(student);

    //             if (info.paymentType == 'Admission') {
    //                 console.log(studentInfo.paidAmount, studentInfo.admissionPaid, 'part 1');
    //                 studentInfo!.paidAmount = studentInfo.paidAmount - info.payNow;
    //                 studentInfo!.admissionPaid = studentInfo.admissionPaid - info.payNow;
    //                 await studentInfo.save();
    //                 console.log(studentInfo.paidAmount, studentInfo.admissionPaid, 'part 2');
    //             } else if (info.paymentType == 'Installment' || info.paymentType == 'Monthly') {
    //                 let testing2 = await this.StudentModelCollege.findByIdAndUpdate(student, {
    //                     ...info,
    //                     paidAmount: studentInfo.paidAmount - info.payNow
    //                 });
    //             }
    //         }

    //         return true;
    //     } catch (e: any) {
    //         const error: any = new Error(e);
    //         error.statusCode = 404;
    //         error.name = 'Student from college not found';
    //         throw error;
    //     }
    // }

    async studentOtherFeePayment(info, department, student, departmentName) {
        try {
            let instance = await FeeInstanceModel.create({
                department: department,
                student: student?.student,
                date: info.date,
                hostel: departmentName ? 1 : 0,
                reciept: student?.receiptNo,
                instance: {
                    Amount_paid: info.amount,
                    admissionFee: student?.admissionFee,
                    programeFee: student?.programFee,
                    Paid_Admission_Amount: student?.admissionPaid,
                    BalanceAdmissionAmount: parseInt(student?.admissionFee) - parseInt(student?.admissionPaid),
                    Total_Paid: student?.paidAmount,
                    Balance_left: parseInt(student?.totalFee) - parseInt(student?.paidAmount),
                    Payment_Type: 'EXTRA PAYMENT',
                    Monthly: info?.monthlyFees
                }
            });

            let studnet = await this.FeePaymentModel.findOne({
                student: departmentName ? student.student._id : student._id,
                department: department
            });

            if (studnet !== null) {
                let result = await this.FeePaymentModel.findOneAndUpdate(
                    {
                        student: departmentName ? student.student._id : student._id,
                        hostel: departmentName ? true : false
                    },
                    {
                        $push: {
                            otherPayment: {
                                instance: instance._id,
                                date: info.date,
                                particular: info.particular,
                                amount: parseInt(info.amount),
                                paymentMode: info.paymentMode
                            }
                        }
                    }
                );
                instance.payment = result._id;
                await instance.save();
            } else {
                let result = await this.FeePaymentModel.create({
                    hostel: departmentName ? 1 : 0,
                    otherPayment: [
                        {
                            instance: instance._id,
                            date: info.date,
                            particular: info.particular,
                            amount: parseInt(info.amount),
                            paymentMode: info.paymentMode
                        }
                    ],
                    department: department,
                    student: departmentName ? student.student._id : student._id
                });
                instance.payment = result._id;
                await instance.save();
            }

            if (departmentName == 'Hostel') {
                let studentInfo = await Student_hostel_admission_Model.findOne({ student: student.student._id });
                studentInfo!.extraPay = studentInfo!.extraPay + parseInt(info!.amount);
                studentInfo!.totalFee = studentInfo!.totalFee + parseInt(info!.amount);
                studentInfo!.paidAmount = studentInfo!.paidAmount + parseInt(info!.amount);
                await studentInfo!.save();
            } else {
                let testing1 = await this.StudentModelCollege.findByIdAndUpdate(student._id, {
                    ...student
                });
            }

            const data = this.FeePaymentModel.find({
                department: department,
                student: departmentName ? student.student._id : student._id
            });

            await sendMessage.sendMessage([studnet?.mobileNo], 'Msg template when given');
            return data;
        } catch (e: any) {
            console.log(e, 'error');
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }
    async expireSendMessage(phoneNo) {
        try {
            let message = `Dear Mr/s. 
                          We are relaying this message as a reminder of an unpaid monthly tuition fee due on “due date”.
                          It is now “present date”, and we are yet to process your payment.
                          Please settle your account as soon as possible.
                          Thank you`;
            let data = await sendMessage.sendMessage(phoneNo, message);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }

    //  Delete
    async deleteOtherPayment(feeId, id: string) {
        try {
            console.log(feeId, id, 'data');
            const data = await this.FeePaymentModel.findByIdAndUpdate(
                feeId,
                {
                    $pull: {
                        otherPayment: { _id: id }
                    }
                },
                { safe: true, upsert: true }
            );
            console.log(data, 'data');

            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete the student of id ${id}`;
            throw error;
        }
    }

    // update college updat function
    async editOtherPayment(info, id, department) {
        try {
            await this.FeePaymentModel.findByIdAndUpdate(id, {
                ...info
            });
            const data = await this.FeePaymentModel.find({
                department: department
            });
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete the student of id ${id}`;
            throw error;
        }
    }

    // balance sheet
    //get
    async getAllBalanceStudent(department: string, departmentName) {
        try {
            let data;
            let dataInfo;
            if (departmentName == 'Hostel') {
                data = await FeeInstanceModel.find({
                    hostel: true
                }).populate('student payment');
            } else {
                data = await this.StudentModelCollege.find({
                    stream: department
                });

                dataInfo = data.map((item) => {
                    if (item.totalFee - item.paidAmount != 0) {
                        return item;
                    }
                });
            }

            if (!dataInfo) {
                const error: any = new Error('Student not found');
                error.statusCode = 404;
                error.name = 'Student from college not found';
                throw error;
            }
            return { data: dataInfo };
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }

    // report
    // get

    async getStudentsFeeReport(res: any) {
        try {
            let data;
            let from = new Date(res.to);
            from.setDate(from.getDate() + 1);

            if (res.departmentName == 'Hostel') {
                // if (res.name === 'all') {
                //     data = await FeeInstanceModel.find({
                //         department: res.stream,
                //         hostel: true,
                //         updatedAt: {
                //             $gte: new Date(res.from),
                //             $lt: new Date(res.to)
                //         }
                //     }).populate({
                //         path: 'student',
                //         match: { standard: res.class, section: res.section }
                //     });
                // } else {
                data = await FeeInstanceModel.find({
                    department: res.stream,
                    hostel: true,
                    updatedAt: {
                        $gte: new Date(res.from),
                        $lte: from
                    }
                }).populate({
                    path: 'student',
                    match: { name: res.name, standard: res.class, section: res.section }
                });
                // }
            } else {
                // if (res.name === 'all') {
                //     data = await FeeInstanceModel.find({
                //         department: res.stream,
                //         hostel: false,
                //         updatedAt: {
                //             $gte: new Date(res.from),
                //             $lt: new Date(res.to)
                //         }
                //     }).populate({
                //         path: 'student',
                //         match: { standard: res.class, section: res.section }
                //     });

                // data = await this.StudentModelCollege.find({
                //     stream: res.stream,
                //     standard: res.class,
                //     section: res.section,
                //     updatedAt: {
                //         $gte: new Date(res.from),
                //         $lt: new Date(res.to)
                //     }
                // });
                // } else {
                data = await FeeInstanceModel.find({
                    department: res.stream,
                    hostel: false,
                    updatedAt: {
                        $gte: new Date(res.from),
                        $lte: from
                    }
                }).populate({
                    path: 'student',
                    match: { name: res.name, standard: res.class, section: res.section }
                });
                // data = await this.StudentModelCollege.find({
                //     name: res.name,
                //     stream: res.stream,
                //     standard: res.class,
                //     section: res.section,
                //     updatedAt: {
                //         $gte: new Date(res.from),
                //         $lt: new Date(res.to)
                //     }
                // });
                // }
            }
            console.log(data, 'find data ');
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Student from college not found';
            throw error;
        }
    }
}

export default AdminService;
