import {Router} from "express";
import { createTag, deleteTag, listTags, updateStatus, updateTag } from "../controller/tags.controller";
import { Authentication } from "../middleware/auth.middleware";
import { isAuthorised } from "../middleware/role.middleware";
import { Roles } from "../enums/user.enum";

export const tagRouter = Router();

tagRouter.post('/create',Authentication,createTag);
tagRouter.get('/list',Authentication,isAuthorised(Roles.MANAGER,Roles.CANDIDATE),listTags);
tagRouter.patch('/update/:id',Authentication,updateTag);
tagRouter.patch('/update/:id',Authentication,updateTag);
tagRouter.patch('/updateStatus/:id',Authentication,updateStatus);
tagRouter.delete('/delete/:id',Authentication,deleteTag);
