import { Types } from "mongoose";
import { AttendanceSource } from "./shared.typings";

export type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "HALF_DAY"
  | "HOLIDAY"
  | "WEEK_OFF"
  | "ON_LEAVE"
  | "INCOMPLETE";

export interface IAttendanceDaily {
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId;

  attendanceDate: Date;
  payableDayFraction: number;
  shiftId?: Types.ObjectId;

  firstCheckIn: Date | null;

  lastCheckOut: Date | null;

  workingMinutes: number;

  breakMinutes: number;

  overtimeMinutes: number;

  lateMinutes: number;

  earlyExitMinutes: number;

  totalPunches: number;

  status: AttendanceStatus;

  regularized: boolean;

  sourceSummary: AttendanceSource[];

  createdAt: Date;

  updatedAt: Date;
}
