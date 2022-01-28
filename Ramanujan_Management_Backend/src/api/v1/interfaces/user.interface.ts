export enum Gender {
    male,
    female,
    others
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
    tokens?: Array<string>;
}

export interface IUserBase {
    name: string;
    email: string;
    password: string;
    mobileNo: number;
    address: string;
    biometric_code: string;
    gender: {
        type: number;
        enum: Gender;
    };
}

export interface Token {
    accessToken: string;
    tokenSecrect: string;
}
