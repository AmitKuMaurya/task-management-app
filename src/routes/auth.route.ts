import {Router} from "express";
import {register} from "../controller/auth.controller"
export const userRouter = Router();

userRouter.post('/register', register);

