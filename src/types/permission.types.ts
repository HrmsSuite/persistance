import { Types } from "mongoose";
import { PermissionAction, PermissionModule } from "../constants";

export interface IPermission {
  /**
   * Permission key
   * Example:
   * employee.create
   */
  key: string;

  /**
   * Module name
   * Example:
   * EMPLOYEE
   */
  module: PermissionModule;

  /**
   * Action
   * Example:
   * CREATE
   */
  action: PermissionAction;

  /**
   * Display name
   */
  name: string;

  /**
   * Description for admin UI
   */
  description?: string;

  /**
   * System permission
   * true = created by platform
   */
  isSystem: boolean;

  isActive: boolean;

  createdBy?: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}
