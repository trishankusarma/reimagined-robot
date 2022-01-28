import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AdminModel, AdminDocument } from '../models';
import AuthService from '../services/auth.service';
import MailService from '../services/externalService/email.service';

declare global {
    namespace Express {
        interface Request {
            token: string;
            admin: any | null;
        }
    }
}

const authService = new AuthService({ AdminModel, MailService: new MailService() });

const multipleRouteAuth = (authtype: string) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.token = <string>req.headers['auth'];

            req.admin = await authService.checkAuthToken(req.token);

            if (req.admin == null) {
                const error: any = new Error('Unauthorized Admin');
                error.StatusCode = 401;
                error.name = 'Unauthorized Admin';
                throw error;
            } else {
                return next();
                // if (req.admin!.isSuperAdmin) {
                //     return next();
                // } else if (authtype === 'type1') {
                //     if (!req.admin.access.some((e: any) => e.to == req.url.split('/')[req.url.split('/').length - 1])) {
                //         const error: any = new Error('Access denied !');
                //         error.statusCode = 401;
                //         throw error;
                //     } else {
                //         next();
                //     }
                // } else if (authtype == 'type2') {
                //     if (!req.admin.access.some((e: any) => e.to == req.url.split('/')[req.url.split('/').length - 2])) {
                //         const error: any = new Error('Access denied !');
                //         error.statusCode = 401;
                //         throw error;
                //     } else {
                //         next();
                //     }
                // }
            }
        } catch (error: any) {
            console.log(error, 'error from middleware');
            throw new Error(error);
        }
    });
};

export default multipleRouteAuth;
