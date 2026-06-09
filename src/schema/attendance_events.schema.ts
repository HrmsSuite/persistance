import { Schema } from "mongoose";
import {
  AttendanceEventType,
  AttendanceSource,
  IAttendanceEvents,
  VerificationMethod,
} from "../types";

const attendanceEventTypes: AttendanceEventType[] = [
  "CHECK_IN",
  "CHECK_OUT",
  "LUNCH_IN",
  "LUNCH_OUT",
  "BREAK_IN",
  "BREAK_OUT",
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

const verificationMethods: VerificationMethod[] = [
  "NONE",
  "FACE",
  "BIOMETRIC",
  "QR",
  "GPS",
];

const LocationSchema = new Schema(
  {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    accuracy: { type: Number, default: null },
  },
  { _id: false },
);

const DeviceSchema = new Schema(
  {
    deviceId: { type: String, default: null },
    deviceType: { type: String, enum: attendanceSources, required: true },
  },
  { _id: false },
);

const VerificationSchema = new Schema(
  {
    method: { type: String, enum: verificationMethods, required: true },
    confidenceScore: { type: Number, default: null },
  },
  { _id: false },
);

export const AttendanceEventSchema = new Schema<IAttendanceEvents>(
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
    eventType: { type: String, enum: attendanceEventTypes, required: true },
    source: { type: String, enum: attendanceSources, required: true },
    eventTime: { type: Date, required: true },
    location: { type: LocationSchema },
    device: { type: DeviceSchema },
    verification: { type: VerificationSchema },
    meta: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
AttendanceEventSchema.index({ companyId: 1, employeeId: 1, attendanceDate: 1 });
