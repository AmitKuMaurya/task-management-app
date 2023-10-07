import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, IUserLogin } from "../interface/users.interface";
import UserModel from "../model/users.schema";
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, confirmPassword, permission, role }: IUser =
            req.body;

        const userExist = await UserModel.findOne({ email: email });
        if (userExist) return res.status(401).send({ msg: "User already exist!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await UserModel.create({
            email,
            password: hashedPassword,
            permission,
            role,

        });

        const token = sign(
            { id: createUser._id, email: createUser.email },
            "JWTSECRET",
            { expiresIn: "2 days" }
        );

        res.status(201).json({ token, createUser });
    } catch (err) {
        console.log({ err: err });
        res.status(501).send({ err: err });
    }
};

export const login = async (req: Request, res: Response) => {

    try {
        const { email, password }: IUserLogin = req.body;
        console.log('req.body: ', req.body);

        // if (req.body = {}) return res.send("Invalid User Credentials !!");

        const user = await UserModel.findOne({ email: email }).select("+password");
        if (!user) return res.send("User does not exits in DataBase !!");

        const compare = (await bcrypt.compare(password, user.password));

        if (!compare) return (`CREDENTIALS ARE NOT VALID !!`);

        if (compare) {
            const token = sign({ email: user.email, id : user._id }, "JWTSECRET", {
                expiresIn: "2 days",
            })

            res.status(201).send({
                msg: "User Logged-in !",
                token: token
            });
        }
    } catch (error) {
        console.log({ error: error });
        res.status(501).send(error);
    }

};
