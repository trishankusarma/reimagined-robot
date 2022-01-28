import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const CLIENT_ID = '447837376655-qdekbbnnk86acu9j0kg4c2d8a8dtvk36.apps.googleusercontent.com';
const CLEINT_SECRET = 'kVgkGWU9LAPhggznqbNOl802';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04L4_1IuSF1vXCgYIARAAGAQSNwF-L9IrIsCElUk72JL1BxZMfWd4SNGTDo2aunV1F5f1e4lm7rRwH3xQ3kdPLuOpZsHjOmU42kI';
class MailService {
    constructor() {}

    async sendForgotPasswordMail(user, token) {
        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI);
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const accessToken = await oAuth2Client.getAccessToken();

        const transpoter = nodemailer.createTransport({
            // service: String('gmail'),
            // auth: {
            //     type: 'OAuth2',
            //     user: 'emailserviceramanujan@gmail.com',
            //     clientId: CLIENT_ID,
            //     clientSecret: CLEINT_SECRET,
            //     refreshToken: REFRESH_TOKEN,
            //     accessToken: accessToken
            // }
            host: 'mail.server.com',
            port: 587,
            secure: false,
            auth: {
                user: 'emailserviceramanujan@gmail.com',
                pass: 'password'
            }
        });
        const resetLink = `${process.env.FRONTEND_DOMAIN_NAME ? process.env.FRONTEND_DOMAIN_NAME : 'http://localhost:3000'}/resetpassword/${user._id}/${token}`;

        const mailOptions = {
            from: 'emailserviceramanujan@gmail.com',
            to: user.email,
            subject: 'Password Email Link',
            html: `Click here to reset your password ${resetLink}`
        };

        let data = await transpoter.sendMail(mailOptions);
        console.log(data, 'email data');
    }
}

export default MailService;
// module.exports = MailService;
