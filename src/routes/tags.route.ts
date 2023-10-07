import { Router } from "express";
import {
  createTag,
  deleteTag,
  listTags,
  updateStatus,
  updateTag,
} from "../controller/tags.controller";
import { Authentication } from "../middleware/auth.middleware";
import { isAuthorised } from "../middleware/role.middleware";
import { Permission, Roles } from "../enums/user.enum";
import { isPermitable } from "../middleware/permission.middleware";

export const tagRouter = Router();

tagRouter.post(
  "/create",
  Authentication,
  isAuthorised(Roles.MANAGER, Roles.CANDIDATE),
  isPermitable(Permission.CREATE),
  createTag
);
tagRouter.get(
  "/list",
  Authentication,
  isAuthorised(Roles.MANAGER, Roles.CANDIDATE),
  isPermitable(Permission.READ),
  listTags
);
tagRouter.patch(
  "/update/:id",
  Authentication,
  isAuthorised(Roles.MANAGER, Roles.CANDIDATE),
  isPermitable(Permission.UPDATE),
  updateTag
);
tagRouter.patch(
  "/updateStatus/:id",
  Authentication,
  isAuthorised(Roles.MANAGER, Roles.CANDIDATE),
  isPermitable(Permission.UPDATE),
  updateStatus
);
tagRouter.delete(
  "/delete/:id",
  Authentication,
  isAuthorised(Roles.MANAGER, Roles.CANDIDATE),
  isPermitable(Permission.DELETE),
  deleteTag
);
