import { SessionDocument } from '../../models';
import { Model } from 'mongoose';

class SessionService {
    private _Session_model;

    constructor({ SessionModel }: { SessionModel: Model<SessionDocument> }) {
        this._Session_model = SessionModel;
    }

    // creating new stuff data base
    //@post request
    async create_new_Session(sessionData: Object) {
        try {
            const data = await this._Session_model.create(sessionData);

            await data.save();
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'OPPS Unable to create new Session , please try again';
            throw error;
        }
    }

    // @get request
    async getAllSessions(id: string) {
        try {
            const data = await this._Session_model.find({
                department: id
            });
            // this.toJson()
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            throw error;
        }
    }

    // @get request
    async getOneSession(id: string) {
        try {
            const data = await this._Session_model.findById(id);
            // this.toJson()
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = 'Session not found';
            throw error;
        }
    }

    // @patch request
    async editOneSession(id: string, dataUpdate: object) {
        try {
            await this._Session_model.findByIdAndUpdate(id, dataUpdate);
            return dataUpdate;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to update the Session of id ${id}`;
            throw error;
        }
    }

    // @delete request
    async deleteOneSession(id: string) {
        try {
            const data = await this._Session_model.findByIdAndDelete(id);
            return data;
        } catch (e: any) {
            const error: any = new Error(e);
            error.statusCode = 404;
            error.name = `Unable to delete the Session of id ${id}`;
            throw error;
        }
    }
}
export default SessionService;
