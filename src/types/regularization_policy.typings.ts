import { Types } from "mongoose";

export interface IAttendanceRegularizationPolicy {
  companyId: Types.ObjectId;

  enabled: boolean;

  // Limits
  maxRequestsPerMonth?: number;
  maxBackdatedDays?: number;

  // Attendance type permissions
  allowMissedPunchRegularization: boolean;
  allowWeekOffRegularization: boolean;
  allowHolidayRegularization: boolean;

  // Request restrictions
  allowMultipleRequestsPerDay: boolean;
  allowAfterPayrollProcessed: boolean;

  // Single approver
  approverId: Types.ObjectId;

  // Validation
  attachmentRequired: boolean;
  reasonMandatory: boolean;

  createdAt: Date;
  updatedAt: Date;
}
