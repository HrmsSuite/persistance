import { model } from "mongoose";
import { RoleSchema } from "../schema";
import { IRole } from "../types";

export const RolesModel = model<IRole>("Role", RoleSchema);
