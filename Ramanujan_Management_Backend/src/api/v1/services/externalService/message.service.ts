import fast2sms from 'fast-two-sms';

class MessageService {
    constructor() {}

    async sendMessage(mobileNumbers: Array<number>, message: string) {
        try {
            let response = await fast2sms.sendMessage({ authorization: process.env.API_KEY_MSG as string, message: message, numbers: mobileNumbers });
            return response;
        } catch (err) {
            console.log(err, 'err message');
        }
    }
}

export default MessageService;
