import { Types } from "mongoose";
import { Permission, RoleType } from "../constants";

export interface IRole {
  companyId: Types.ObjectId;

  name: string;

  code: string;

  description?: string;

  type: RoleType;

  permissionIds: Types.ObjectId[];

  isDefault: boolean;

  isActive: boolean;

  isDeleted?: boolean;

  createdBy?: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  deletedBy?: Types.ObjectId;

  deletedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
