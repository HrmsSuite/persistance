import { model } from "mongoose";
import { PermissionSchema } from "../schema";
import { IPermission } from "../types";


export const PermissionModel =
model<IPermission>(
  "Permission",
  PermissionSchema,
);