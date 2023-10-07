import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { IVerifyToken } from "../interface/users.interface";
import UserModel from "../model/users.schema";
export const Authentication = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers['authorization']?.split(' ')[1] as string;
       

        if (!token) return "Not Authenticated!";

        const decodeToken = verify(token, "JWTSECRET") as IVerifyToken;

        const userId = decodeToken['id'].toString();


        const checkUserInDB = await UserModel.findOne({ _id : userId });

        if (checkUserInDB) {
            req['user'] = decodeToken['id'].toString();
            console.log('req[user] ', req['user']);
            next();
        } else {
            next("User doesn't exist !")
        }
    } catch (error) {
        console.log({ error: error });
        res.status(501).send({error : error});
    }
}