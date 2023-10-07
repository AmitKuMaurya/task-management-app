import {Router} from "express";
import { createTag, listTags } from "../controller/tags.controller";
import { Authentication } from "../middleware/auth";

export const tagRouter = Router();

tagRouter.post('/create',Authentication,createTag);
tagRouter.get('/list',Authentication,listTags);
