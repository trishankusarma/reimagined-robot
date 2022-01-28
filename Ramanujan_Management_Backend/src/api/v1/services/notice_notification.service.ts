import { notifications, StudentDocumentCollege } from '../models';
import { Model } from 'mongoose';
import MailService from './externalService/email.service';
import MessageService from './externalService/message.service';

/**
 *
 *  @Adminservice by Jitul Teron
 *
 **/

class NotificationAndMailService {
    private StudentModelCollege;
    private _MailService;
    private _MessageService;
    private _NotificationModel;
    constructor({
        StudentModelCollege,

        MailService,
        NotificationModel,
        MessageService
    }: {
        StudentModelCollege: Model<StudentDocumentCollege>;
        MailService: MailService;
        NotificationModel: Model<notifications>;
        MessageService: MessageService;
    }) {
        this.StudentModelCollege = StudentModelCollege;
        this._MailService = MailService;
        this._MessageService = MessageService;
        this._NotificationModel = NotificationModel;
    }

    /** @Post */

    async sendNotificaiton(peopleData: Array<any>, message: string, title: string, departmentId) {
        let mobileNumbers = [] as any;
        let toBeSaved = [] as any;

        for (let i = 0; i < peopleData.length; i++) {
            mobileNumbers.push(peopleData[i].mobileNo);
            toBeSaved.push({
                message: message,
                title: title,
                department: departmentId,
                toModel: peopleData[i].saveTo,
                id: peopleData[i]._id
            });
        }

        let result = await this._MessageService.sendMessage(mobileNumbers, message);

        if (!result.return) {
            let err: any = new Error(result.message);
            err.statusCode = result.status_code;
            throw err;
        }

        const data = await this._NotificationModel.create(toBeSaved);

        return data;
    }

    /** @Get */

    async getSendNotificaitonAll(departmentId) {
        const data = await this._NotificationModel
            .find({
                department: departmentId
            })
            .populate('id', 'email mobileNo name');
        return data;
    }
    async getSendNotificaitonOne(id: string) {
        const data = await this._NotificationModel.findById(id).populate('id', 'email mobileNo');
        return data;
    }

    /** @Delete */
    async deleteSendNotificaiton(people: Array<string>) {
        const data = await this._NotificationModel.deleteMany({
            _id: { $in: people }
        });
        return data;
    }

    async deleteAllStudentsCollege(arr: Array<any>) {
        try {
            const data = await this.StudentModelCollege.deleteMany({
                _id: { $in: arr }
            });
            return data;
        } catch (e) {
            const error: any = new Error();
            error.statusCode = 404;
            error.name = 'Unable to delete the list of students fron college';
            throw error;
        }
    }

    /** @Patch */
}

export default NotificationAndMailService;
