import { Schema, model } from "mongoose";
import { Permission, Roles } from "../enums/user.enum";

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
    permission: { type: [Number] , require: true, default : Permission.READ  },
    role: { type: Number, require: true, select: false , default : Roles.CANDIDATE  }
}, {
    timestamps: true
});

const UserModel = model<IUser>("user", UserSchema);
export default UserModel;