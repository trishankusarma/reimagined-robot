import { isValid } from '../../utils/isValid';
import { student_hostel_admission_document, StudentModelCollege, FeePaymentModel, FeeInstanceModel } from '../../models';
import MailService from '../externalService/email.service';
import { Model, Types } from 'mongoose';
const { ObjectId } = Types;

class student_hostel_service {
    private _Student_hostel_model;
    private _Mailservice;

    constructor({ Student_hostel_admission_Model, MailService }: { Student_hostel_admission_Model: Model<student_hostel_admission_document>; MailService: MailService }) {
        this._Student_hostel_model = Student_hostel_admission_Model;
        this._Mailservice = MailService;
    }

    // creating new database for newly joined hostell student

    // @POST
    async create_new_student(
        hostel,
        room,
        enrollment_no,
        Admission_Date,
        Admission_Fee, //admissionFee
        admission_paid, //admissionPaid
        Monthly_Fees, //programFees
        Concession_Discount, //concession
        Total, //totalFee
        Total_paid, //paidAmount
        otherFee, //otherFee
        Year,
        month,
        payment_mode,
        department
    ) {
        try {
            console.log(enrollment_no, 'enrollment_no');
            let student = await StudentModelCollege.findOne({ admissionNo: `${enrollment_no}` });

            if (!student) {
                return {
                    error: 'Invalid enrollment number!!'
                };
            }

            let existing = await this._Student_hostel_model.findOne({ enrollment_no });

            if (existing) {
                return {
                    error: 'Already registered!!'
                };
            }

            const data = await this._Student_hostel_model.create({
                hostel,
                room,
                enrollment_no,
                Admission_Date,
                admissionFee: Admission_Fee, //admissionFee
                admissionPaid: admission_paid, //admissionPaid
                programFees: Monthly_Fees, //programFees
                concession: Concession_Discount, //concession
                totalFee: Total, //totalFee
                paidAmount: admission_paid, //paidAmount
                otherFee, //otherFee
                Year,
                month,
                payment_mode,
                student: student._id,
                department,
                admissionPaidPermatent: admission_paid
            });

            await data.populate('student', 'name rollNo gender mobileNo').execPopulate();

            await data.save();

            return data;
        } catch (e: any) {
            console.log(e, 'error');
            const error: any = new Error(e);
            error.name = 'OPPs unable to create new student database , please try again';
            error.statusCode = 404;
            throw error;
        }
    }
    // @GET
    async get_all_student() {
        try {
            const data = await this._Student_hostel_model
                .find(
                    {},
                    {
                        enrollment_no: true,
                        room: true,
                        hostel: true,
                        student: true
                    }
                )
                .populate('student', 'name rollNo gender mobileNo');

            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.name = 'Opps unable to load all students data , please try again';
            error.statusCode = 404;
            throw error;
        }
    }
    async get_one_student(id: String) {
        try {
            const data = await this._Student_hostel_model.findById(id);
            console.log(data);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.name = 'OPPS unable to find this student , please try again';
            error.statusCode = 404;
            throw error;
        }
    }
    async get_one_studentRoll(enrollment_no) {
        try {
            const data = await this._Student_hostel_model.findOne({ enrollment_no: enrollment_no }).populate('student');

            if (!data) {
                const error: any = new Error();
                error.name = 'Student not found';
                error.statusCode = 404;
                throw error;
            }
            const payment = await FeePaymentModel.findOne({
                hostel: true,
                student: data.student._id
            }).populate('student');
            console.log(payment, 'payment');
            return { data, payment };
        } catch (e: any) {
            const error: any = new Error(e);
            error.name = 'OPPS unable to find this student , please try again';
            error.statusCode = 404;
            throw error;
        }
    }

    async delete_one_student(id: string) {
        try {
            const data = await this._Student_hostel_model.findByIdAndDelete(id);
            // const data = await this._Student_hostel_model.findById(id);

            console.log(data, 'data -s tudent');

            const feePayment1 = await FeePaymentModel.findOneAndDelete({
                hostel: true,
                student: data.student
            });

            const feePayment2 = await FeeInstanceModel.deleteMany({
                hostel: true,
                student: data.student
            });

            console.log(feePayment1, feePayment2);

            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.name = 'OPPS unable to delete this student , please try again';
            error.statusCode = 404;
            throw error;
        }
    }

    // @PATCH
    async update_one_student(id: String, update_data: Object) {
        try {
            await this._Student_hostel_model.findByIdAndUpdate(id, update_data);
            return update_data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.name = 'OPPS unable to update data of student , please try again ';
            error.statusCode = 404;
            throw error;
        }
    }
}

export default student_hostel_service;
