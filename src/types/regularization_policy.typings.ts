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

  // Approval workflow
  approvalFlow: "REPORTING_MANAGER" | "HR" | "REPORTING_MANAGER_THEN_HR";

  // Validation
  attachmentRequired: boolean;
  reasonMandatory: boolean;

  createdAt: Date;
  updatedAt: Date;
}
