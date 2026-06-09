import { Types } from "mongoose";
import { AttendanceSource } from "./shared.typings";

export type AttendanceEventType =
  | "CHECK_IN"
  | "CHECK_OUT"
  | "LUNCH_IN"
  | "LUNCH_OUT"
  | "BREAK_IN"
  | "BREAK_OUT";

export type VerificationMethod = "NONE" | "FACE" | "BIOMETRIC" | "QR" | "GPS";

export interface IAttendanceEvents {
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId;
  attendanceDate: Date;
  eventType: AttendanceEventType;
  source: AttendanceSource;
  eventTime: Date;
  location?: ILocation;
  device?: IDevice;
  verification?: IVerification;
  meta?: Record<string, any>;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ILocation {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
}

export interface IDevice {
  deviceId: string | null;
  deviceType: AttendanceSource;
}

export interface IVerification {
  method: VerificationMethod;
  confidenceScore: number | null;
}
