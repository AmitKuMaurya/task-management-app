import { Request, Response, NextFunction } from "express";
import UserModel from "../model/users.schema";
export const isPermitable = (...roles: number[]) => {
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
          return res.send("Access Denied !");
        }
      } else {
        return res.send("User Dosen't exost in db !");
      }
    } catch (err) {
      console.log({ err: err });
      res.status(201).send({ err : "Internal Server Error !"});
    }
  };
};
