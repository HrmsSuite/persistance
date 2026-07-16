import { Types } from "mongoose";
import { WorkflowModule, ApproverType } from "../constants";

export interface IWorkflowLevel {
  level: number;

  approverType: ApproverType;

  /**
   * Required when approverType === "ROLE"
   */
  roleId?: Types.ObjectId;

  /**
   * Required when approverType === "SPECIFIC_EMPLOYEE"
   */
  approverId?: Types.ObjectId;

  isRequired: boolean;
}

export interface IWorkflow {
  companyId: Types.ObjectId;

  module: WorkflowModule;

  name: string;

  description?: string;

  levels: IWorkflowLevel[];

  isActive: boolean;

  isDeleted?: boolean;

  createdBy?: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  deletedBy?: Types.ObjectId;

  deletedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
