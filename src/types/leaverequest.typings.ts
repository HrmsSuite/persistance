import { Types } from "mongoose";
import {
  LEAVE_TYPE_NAMES,
  LEAVE_STATUS,
  APPROVAL_ROLES,
  APPROVAL_STEP_STATUS,
} from "./constant.typings";
 
// APPROVAL STEP 
export interface IApprovalStep {
  level: 1 | 2;
  role: (typeof APPROVAL_ROLES)[number];        // "manager" | "admin"
  approverId: Types.ObjectId;
  status: (typeof APPROVAL_STEP_STATUS)[number]; // "pending" | "approved" | "rejected"
  remarks?: string;
  actedAt?: Date;
}

// LEAVE REQUESTn
export interface ILeaveRequest {
  // Identity
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId;           // who applied
  managerId: Types.ObjectId;            // from employee profile

  // Leave details
  leaveTypeName: (typeof LEAVE_TYPE_NAMES)[number];
  startDate: Date;
  endDate: Date;
  totalDays: number;                    // computed — working days only
  isHalfDay: boolean;
  halfDaySession?: "morning" | "afternoon"; // required if isHalfDay = true

  // Supporting info
  reason: string;
  attachmentUrl?: string;               // medical cert for SL

  // Status & Approval
  status: (typeof LEAVE_STATUS)[number];
  approvalChain: IApprovalStep[];
  currentLevel: 1 | 2;                  

  // Handover
  handoverEmployeeId?: Types.ObjectId;

  // Audit
  audit: ILeaveRequestAudit;
}

export interface ILeaveRequestAudit {
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}