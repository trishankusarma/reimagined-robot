import { LeaveApplication, StudentDocumentCollege } from '../models';
import { Model } from 'mongoose';
/**
 *
 *  @Adminservice by Jitul Teron
 *
 **/

class LeaveApplicationService {
    private StudentModelCollege;
    private Leave_Application_Model;
    constructor({ StudentModelCollege, Leave_Application_Model }: { StudentModelCollege: Model<StudentDocumentCollege>; Leave_Application_Model: Model<LeaveApplication> }) {
        this.StudentModelCollege = StudentModelCollege;
        this.Leave_Application_Model = Leave_Application_Model;
    }

    /** @Post */

    async leaveApplication(id: string, modelOf: string, reason: string, From_Date: string, To_date: string, department) {
        try {
            let data = await this.Leave_Application_Model.create({
                id,
                modelOf,
                reason,
                From_Date,
                To_date,
                department
            });
            data.save();
            return data;
        } catch (error) {
            console.log(error, 'leaveapplication');
            throw error;
        }
    }

    /** @Get */
    //modelOf
    async getAllLeaveApplication(modelOf: string, department) {
        try {
            let data = await this.Leave_Application_Model.find({
                modelOf: modelOf,
                department: department
            }).populate('id', 'name admissionNo rollNo DOB mobileNo standard section');
            return data;
        } catch (error) {
            console.log(error, 'leaveapplication');
            throw error;
        }
    }
    async getAllApplication(department) {
        try {
            let data = await this.Leave_Application_Model.find({
                department: department
            }).populate('id');
            return data;
        } catch (error) {
            console.log(error, 'leaveapplication');
            throw error;
        }
    }

    /** @Delete */
    async deleteLeaveApplication(id: string) {
        try {
            console.log(id, 'deekte');
            let data = await this.Leave_Application_Model.findByIdAndDelete(id);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /** @Patch */

    async updateOneLeaveApplication(_id: string, id: string, modelOf: string, reason: string, From_Date: string, To_date: string, department) {
        this.Leave_Application_Model.findByIdAndUpdate(_id, {
            id,
            modelOf,
            reason,
            From_Date,
            To_date,
            department
        });
    }
}

export default LeaveApplicationService;
