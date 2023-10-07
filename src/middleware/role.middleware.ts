import { Request, Response, NextFunction } from "express";
import UserModel from "../model/users.schema";
export const isAuthorised = (...roles: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;

      const checkUserId = await UserModel.findById({ _id: user }).select(
        "+role"
      );
      const userRole = checkUserId?.role as any;
      if (checkUserId) {
        if (roles.indexOf(userRole) !== -1) {
          next();
        } else {
          return res.status(401).send({ msg : "Access Denied !, you are unAuthorised !"});
        }
      } else {
        return res.status(404).send({msg : "User Doesn't exist in db !"});
      }
    } catch (err) {
      console.log({ err: err });
      res.status(201).send({ err : "Internal Server Error !"});
    }
  };
};
