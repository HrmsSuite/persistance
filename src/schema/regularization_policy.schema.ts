import { Schema } from "mongoose";
import { IAttendanceRegularizationPolicy } from "../types";

export const AttendanceRegularizationPolicySchema =
  new Schema<IAttendanceRegularizationPolicy>(
    {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        unique: true,
        index: true,
      },

      enabled: {
        type: Boolean,
        default: true,
        required: true,
      },

      // Limits
      maxRequestsPerMonth: {
        type: Number,
        min: 0,
      },

      maxBackdatedDays: {
        type: Number,
        min: 0,
      },

      // Attendance type permissions
      allowMissedPunchRegularization: {
        type: Boolean,
        default: true,
        required: true,
      },

      allowWeekOffRegularization: {
        type: Boolean,
        default: false,
        required: true,
      },

      allowHolidayRegularization: {
        type: Boolean,
        default: false,
        required: true,
      },

      // Request restrictions
      allowMultipleRequestsPerDay: {
        type: Boolean,
        default: false,
        required: true,
      },

      allowAfterPayrollProcessed: {
        type: Boolean,
        default: false,
        required: true,
      },

      // Approval workflow
      approvalFlow: {
        type: String,
        enum: ["REPORTING_MANAGER", "HR", "REPORTING_MANAGER_THEN_HR"],
        default: "REPORTING_MANAGER",
        required: true,
      },

      // Validation
      attachmentRequired: {
        type: Boolean,
        default: false,
        required: true,
      },

      reasonMandatory: {
        type: Boolean,
        default: true,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

/**
 * One policy per company
 */
AttendanceRegularizationPolicySchema.index({ companyId: 1 }, { unique: true });
