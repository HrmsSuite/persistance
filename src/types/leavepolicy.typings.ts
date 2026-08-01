import { Types } from "mongoose";
import {
  LEAVE_TYPE_NAMES,
  GENDER_ELIGIBILITY,
  APPROVAL_LEVELS,
} from "./constant.typings"; 

export interface IApprovalConfigStep {
  level: number;
  type: "direct_manager" | "manager_of_manager" | "department_head" | "admin";
}

export interface ILeavePolicy {
  // Identity
  companyId: Types.ObjectId;
  leaveTypeName: (typeof LEAVE_TYPE_NAMES)[number];

  // Quota
  maxDaysPerYear: number;
  maxDaysPerMonth?: number;
  minDaysPerApplication: number;
  maxDaysPerApplication?:number;

  // Rules
  carryForwardAllowed: boolean;
  maxCarryForwardDays?: number;
  encashmentAllowed: boolean;
  maxEncashmentDays?: number;

  // Eligibility
  genderEligibility: (typeof GENDER_ELIGIBILITY)[number];
  probationEligible: boolean;
  minServiceDays: number;

  // Notice
  advanceNoticeDays: number;
  backdatedAllowed: boolean;
  maxBackdatedDays?: number;

  // Approval
  approvalLevels: (typeof APPROVAL_LEVELS)[number];
  approvalConfig: IApprovalConfigStep[];

  // Meta
  audit: IAuditPolicy;
  isActive: boolean;
}

export interface IAuditPolicy {
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}