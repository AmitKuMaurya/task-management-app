import {Router} from "express";
import {login, register} from "../controller/users.controller"
export const userRouter   = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

