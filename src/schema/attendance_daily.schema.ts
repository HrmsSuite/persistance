import { Schema } from "mongoose";
import { IAttendanceDaily, AttendanceStatus, AttendanceSource } from "../types";

const attendanceStatuses: AttendanceStatus[] = [
  "PRESENT",
  "ABSENT",
  "HALF_DAY",
  "HOLIDAY",
  "WEEK_OFF",
  "ON_LEAVE",
  "INCOMPLETE",
];

const attendanceSources: AttendanceSource[] = [
  "WEB",
  "MOBILE",
  "FACE",
  "BIOMETRIC",
  "QR",
  "API",
  "ADMIN",
];

export const AttendanceDailySchema = new Schema<IAttendanceDaily>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    attendanceDate: { type: Date, required: true, index: true },
    payableDayFraction: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0,
    },
    shiftId: { type: Schema.Types.ObjectId, ref: "shifts" },

    firstCheckIn: { type: Date, default: null },
    lastCheckOut: { type: Date, default: null },

    workingMinutes: { type: Number, required: true, min: 0, default: 0 },
    breakMinutes: { type: Number, required: true, min: 0, default: 0 },
    overtimeMinutes: { type: Number, required: true, min: 0, default: 0 },
    lateMinutes: { type: Number, required: true, min: 0, default: 0 },
    earlyExitMinutes: { type: Number, required: true, min: 0, default: 0 },
    totalPunches: { type: Number, required: true, min: 0, default: 0 },

    status: {
      type: String,
      enum: attendanceStatuses,
      required: true,
      default: "INCOMPLETE",
    },
    regularized: { type: Boolean, required: true, default: false },

    sourceSummary: {
      type: [{ type: String, enum: attendanceSources }],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// One record per employee per day per company — enforces no duplicates
AttendanceDailySchema.index(
  { companyId: 1, employeeId: 1, attendanceDate: 1 },
  { unique: true },
);

// Useful for company-wide daily dashboard queries
AttendanceDailySchema.index({ companyId: 1, attendanceDate: 1 });
