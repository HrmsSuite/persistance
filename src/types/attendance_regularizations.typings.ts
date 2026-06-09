import { Types } from "mongoose";

export interface IAttendanceRegularization {
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId;
  attendanceDate: Date;
  requestedCheckIn?: Date;
  requestedCheckOut?: Date;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approvedBy?: Types.ObjectId;
  managerRemarks?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
