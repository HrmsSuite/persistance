import { Types } from "mongoose";
import {
  LEAVE_TYPE_NAMES,
  LEAVE_STATUS,
  APPROVAL_ROLES,
  APPROVAL_STEP_STATUS,
  APPROVAL_LEVELS,
} from "./constant.typings";

// APPROVAL STEP
export interface IApprovalStep {
  level: (typeof APPROVAL_LEVELS)[number];
  role: (typeof APPROVAL_ROLES)[number]; // "manager" | "admin"
  approverId: Types.ObjectId;
  status: (typeof APPROVAL_STEP_STATUS)[number]; // "pending" | "approved" | "rejected"
  remarks?: string;
  actedAt?: Date;
}

// LEAVE REQUESTn
export interface ILeaveRequest {
  // Identity
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId; // who applied
  managerId: Types.ObjectId; // from employee profile

  // Leave details
  leavePolicyId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalDays: number; // computed — working days only
  isHalfDay?: boolean;
  halfDaySession?: "morning" | "afternoon"; // required if isHalfDay = true

  // Supporting info
  reason: string;
  attachmentUrl?: string; // medical cert for SL
  cancelReason?: string | null;

  // Status & Approval
  status: (typeof LEAVE_STATUS)[number];
  approvalChain: IApprovalStep[];
  currentLevel: (typeof APPROVAL_LEVELS)[number] | null;

  // Handover
  handoverEmployeeId?: Types.ObjectId;

  // Activity History
  activityLog: ILeaveRequestActivity[];

  // Audit
  audit: ILeaveRequestAudit;
}

export interface ILeaveRequestAudit {
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}

export interface ILeaveRequestActivity {
  action:
    | "created"
    | "manager_approved"
    | "admin_approved"
    | "rejected"
    | "withdrawn"
    | "cancelled"
    | "reopened";

  performedBy: Types.ObjectId;
  performedAt: Date;
  remarks?: string;
}
