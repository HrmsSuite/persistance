import { Types } from "mongoose";

export interface Shift {
  name: string;
  startTime: Date;
  endTime: Date;
  workingHours: number;
  halfDayThreshold: number;
  weeklyOff: string[];
  overtimeEligible: boolean;
  gracePeriodMinutes: number;
  isNightShift: boolean;
  breakDurationMinutes: number;
  isActive: boolean;
}

export interface ShiftData {
  companyId: Types.ObjectId;

  data: Shift;

  meta: {
    version: number;
    isDeleted: boolean;
    auditTrail: any[];
  };

  createdAt: Date;
  updatedAt: Date;
}