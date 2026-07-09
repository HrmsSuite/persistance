import { Types } from "mongoose";

export interface IAttendanceRegularization {
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId;
  attendanceDailyId: Types.ObjectId;
  attendanceDate: Date;
  currentCheckIn?: Date;
  currentCheckOut?: Date;
  requestedCheckIn?: Date;
  requestedCheckOut?: Date;
  reason: string;
  regularizationType: "CHECK_IN" | "CHECK_OUT" | "BOTH" | "MISSED_PUNCH";
  requestSource: "WEB" | "MOBILE" | "ADMIN";
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  // Review information
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  reviewComments?: string;
  approvalHistory?: {
    action: "SUBMITTED" | "APPROVED" | "REJECTED" | "RESUBMITTED";
    performedBy: Types.ObjectId;
    remarks?: string;
    performedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
