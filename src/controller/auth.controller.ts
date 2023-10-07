import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, IUserLogin } from "../interface/user.interface";
import UserModel from "../model/auth.schema";
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
  const { email, password } : IUserLogin = req.body;

  if (!email || !password) return "Invalid User Credentials !!";

  const user : IUser |null   = await UserModel.findOne({ email: email });
  if (user) return "User does not exits !!";
  
//   const compare  = bcrypt.compare(password, user);

//   if(!compare) return (`CREDENTIALS ARE NOT VALID !!`);

};
