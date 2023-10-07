import { Request, Response, NextFunction } from "express";
import UserModel from "../model/users.schema";
export const isPermitable = (permissions : string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      
      console.log('permissions: ', permissions);
      const checkUserId = await UserModel.findById({ _id: user }).select(
        "+permission"
        );
  
      const userPermission = checkUserId?.permission as any;

      if (checkUserId) {
        if (permissions === userPermission) {
          next();
        } else {
          return res.send({msg : "Access Denied !, You donn't have permission to perform that acticity !"});
        }
      } else {
        return res.send({msg : "User Dosen't exost in db !"});
      }
    } catch (err) {
      console.log({ err: err });
      res.status(201).send({ err : "Internal Server Error !"});
    }
  };
};
