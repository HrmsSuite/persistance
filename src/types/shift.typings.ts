import { Types } from "mongoose";

export interface Shift {
  name: string;
  startTime: string;
  endTime: string;
  workingHours: number;
  halfDayThreshold: number;
  weeklyOff: string[];
  overtimeEligible: boolean;
  gracePeriodMinutes: number;
  isNightShift: boolean;
  overtimeAfterMinutes?: number;
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
