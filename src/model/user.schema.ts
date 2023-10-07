import { Schema, model } from "mongoose";

interface IUser {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    permission: string[]
}

const UserSchema = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true, select: false },
    role: { type: String, require: true },
    permission: { type: [Permission], require: true }
}, {
    timestamps: true
});

const UserModel = model<IUser>("user", UserSchema);
export default UserModel;