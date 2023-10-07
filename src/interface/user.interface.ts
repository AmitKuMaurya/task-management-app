export interface IUser {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    permission: string[]
}

export interface IUserLogin {
    email: string;
    password: string;
}