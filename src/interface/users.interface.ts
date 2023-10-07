import {Types} from "mongoose"
export interface IUser {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    permission: string[];
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IVerifyToken {
    id : string | Types.ObjectId;
    email : string;
}