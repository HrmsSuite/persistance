import { Types } from "mongoose";

export enum RegularizationType {
  CHECK_IN = "CHECK_IN",
  CHECK_OUT = "CHECK_OUT",
  BOTH = "BOTH",
  MISSED_PUNCH = "MISSED_PUNCH",
}

export enum RegularizationStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  WITHDRAWN = "WITHDRAWN",
}

export enum RequestSource {
  WEB = "WEB",
  MOBILE = "MOBILE",
  ADMIN = "ADMIN",
}

export enum ApprovalAction {
  SUBMITTED = "SUBMITTED", 
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  WITHDRAWN = "WITHDRAWN",
}

export interface IApprovalHistory {
  action: ApprovalAction;

  previousStatus?: RegularizationStatus;

  newStatus?: RegularizationStatus;

  performedBy: Types.ObjectId;

  remarks?: string;

  performedAt: Date;
}

export interface IAttachment {
  fileName: string;
  fileUrl: string;
}

export interface IAttendanceRegularization {
  // Tenant
  companyId: Types.ObjectId;

  // Employee who raised the request
  employeeId: Types.ObjectId;

  // Attendance reference
  attendanceDailyId: Types.ObjectId;

  attendanceDate: Date;

  // Existing attendance values
  currentCheckIn?: Date;

  currentCheckOut?: Date;

  // Requested values
  requestedCheckIn?: Date;

  requestedCheckOut?: Date;

  // Type
  regularizationType: RegularizationType;

  // Request origin
  requestSource: RequestSource;

  // Employee reason
  reason: string;

  // Supporting documents
  attachments?: IAttachment[];

  // Current approver
  approverId: Types.ObjectId;

  // Request status
  status: RegularizationStatus;

  // Review details
  reviewedBy?: Types.ObjectId;

  reviewedAt?: Date;

  reviewRemarks?: string;

  // Complete audit trail
  approvalHistory: IApprovalHistory[];

  // Attendance update tracking
  isAttendanceUpdated: boolean;

  attendanceUpdatedAt?: Date;

  // Payroll impact
  payrollAffected: boolean;

  // Audit
  createdBy: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  isDeleted: boolean;

  deletedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}
