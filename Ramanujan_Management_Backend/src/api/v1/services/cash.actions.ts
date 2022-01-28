import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isValid } from '../utils/isValid';
import { AdminDocument, StudentDocumentCollege } from '../models';
import { Document, Model } from 'mongoose';
import MailService from './externalService/email.service';
/**
 *  @Authservice by Jitul Teron
 */

class CashService {
    private _AdminModel;

    private _MailService;

    constructor({ AdminModel, MailService }: { AdminModel: Model<AdminDocument>; MailService: MailService }) {
        this._AdminModel = AdminModel;
        this._MailService = MailService;
    }

    async generateAuthToken(user: AdminDocument) {
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRECT as string);
        user.tokens?.push(token);
        await user.save();
        return token;
    }

    toJson(user: AdminDocument) {
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.tokens;
        return userObj;
    }
    generateForgotPasswordToken(user: any) {
        const payload = {
            email: user.email,
            _id: user._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRECT as string);
        return token;
    }

    checkResetToken(token: string) {
        jwt.verify(token, process.env.JWT_SECRECT as string, function (err: any, decoded) {
            if (err.name === 'TokenExpiredError') {
                const error: any = new Error('Token Expired');
                error.StatusCode = 401;
                error.name = 'Unauthorized';
                throw error;
            }
        });
    }

    async checkAuthToken(token: string) {
        const decode: any = jwt.verify(token, process.env.JWT_SECRECT as string);

        const user: any = await this._AdminModel.findById(decode.id);

        if (isValid(user) || !user.tokens.includes(token)) {
            const error: any = new Error('Unauthorized Admin');
            error.StatusCode = 401;
            error.name = 'Unauthorized Admin';
            throw error;
        }

        return user;
    }
    async login(email: string, password: string, adminType: string) {
        const user = await this._AdminModel.findOne({ email, adminType }).populate('adminType');
        console.log(user, 'user');
        if (!user) {
            const error: any = new Error('Account not found !');
            error.statusCode = 401;
            error.name = 'Unauthorized';
            throw error;
        }

        const isMatched = await bcrypt.compare(password, user?.password!);

        if (!isMatched) {
            const error: any = new Error('Password is invalid');
            error.statusCode = 401;
            error.name = 'Unauthorized';
            throw error;
        }
        const token = <string>await this.generateAuthToken(user);
        return { user: this.toJson(user), token };
    }

    async signUp(name: string, email: string, password: string, isSuperAdmin: boolean, adminType: string, access: Array<string>) {
        try {
            let check = await this._AdminModel.findOne({ email, adminType });
            if (check) {
                const error: any = new Error(`Admin of type ${adminType} already exists`);
                error.statusCode = 400;
                throw error;
            }
            const user = await this._AdminModel.create({
                name,
                email,
                password,
                isSuperAdmin,
                adminType,
                access
            });

            const token = await this.generateAuthToken(user);
            return { user: this.toJson(user), token };
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async logout(user: any, token: string) {
        for (var i = 0; i < user.tokens.length; i++) {
            if (user.tokens[i] === token) user.tokens.splice(i, 1);
        }

        await user.save();
    }

    async logoutAll(user: any) {
        user.tokens = [];
        await user.save();
    }

    async forgotpassword(email: string) {
        const user = await this._AdminModel.findOne({ email });
        try {
            if (!user) {
                const error = new Error();
                error.name = 'NoEmail';
                throw error;
            }
            const token = await this.generateAuthToken(user);
            await this._MailService.sendForgotPasswordMail(user, token);
        } catch (error: any) {
            console.log(error.message);
            if (error.name === 'NoEmail') {
                const error: any = new Error('Enter the email once again');
                error.statusCode = 404;
                error.name = 'NoEmail';
                throw error;
            }
            throw new Error('Service couldnot be completed');
        }
    }

    async resetpassword(id: string, token: string, password: string) {
        const user = await this._AdminModel.findById(id);
        console.log(user);
        if (!user) {
            const error: any = new Error('No Such User');
            error.statusCode = 404;
            error.name = 'NotFound';
            throw error;
        }
        this.checkResetToken(token);
        user.password = password;
        await user.save();
        return this.toJson(user);
    }
}

export default CashService;
