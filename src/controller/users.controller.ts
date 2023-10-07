import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, IUserLogin } from "../interface/users.interface";
import UserModel from "../model/users.schema";
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, confirmPassword, permission, role }: IUser =
            req.body;

        if(password !== confirmPassword) {
            return res.status(422).send({ error: "password and confirm password mismatched !" });
        }

        const userExist = await UserModel.findOne({ email: email });
        if (userExist) return res.status(409).send({ msg: "User already exist!" });

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
        res.status(501).send({ err: "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response) => {

    try {
        const { email, password }: IUserLogin = req.body;
        console.log('req.body: ', req.body);


        const user = await UserModel.findOne({ email: email }).select("+password");
        if (!user?.email) return res.status(404).send({msg : "User doesn't exits in DataBase !!"});

        const compare = (await bcrypt.compare(password, user.password));

        if (!compare) return res.status(404).send({msg : "CREDENTIALS ARE NOT VALID "});

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
        res.status(501).send({error : 'Internal Server Error'});
    }

};
