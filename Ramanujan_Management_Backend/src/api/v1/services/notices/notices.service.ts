import { isValid } from '../../utils/isValid';
import { NoticeModel, Notice_Document } from '../../models';
import MailService from '../externalService/email.service';
import { Model, Document } from 'mongoose';

class NoticeService {
    private _Notice_model;
    private _Mailservice;

    constructor({ NoticeModel, MailService }: { NoticeModel: Model<Notice_Document>; MailService: MailService }) {
        this._Notice_model = NoticeModel;
        this._Mailservice = MailService;
    }

    // creating new stuff data base
    //@post request
    async create_new_notice(Type: Number, Class: String, Section: String, Subject: String, Title: String, Upload_file: String) {
        try {
            const data = await this._Notice_model.create({
                Type,
                Class,
                Section,
                Subject,
                Title,
                Upload_file
            });

            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'OPPS Unable to create new notice , please try again';
            throw error;
        }
    }

    // @get request
    async getAllNotice() {
        try {
            const data = await this._Notice_model.find({});
            // this.toJson()
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            throw error;
        }
    }

    // @get request
    async getOneNotice(id: string) {
        try {
            const data = await this._Notice_model.findById(id);
            // this.toJson()
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Notice not found';
            throw error;
        }
    }

    // @patch request
    async editOneNotice(id: string, dataUpdate: object) {
        try {
            const data = await this._Notice_model.findByIdAndUpdate(id, dataUpdate);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to update the Notice of id ${id}`;
            throw error;
        }
    }

    // @delete request
    async deleteOneNotice(id: string) {
        try {
            const data = await this._Notice_model.findByIdAndDelete(id);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete the Notice of id ${id}`;
            throw error;
        }
    }
}
export default NoticeService;
