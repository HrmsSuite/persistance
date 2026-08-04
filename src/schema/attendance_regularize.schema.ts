import { Schema } from "mongoose";
import {
  ApprovalAction,
  IAttendanceRegularization,
  RegularizationStatus,
  RegularizationType,
  RequestSource,
} from "../types";

export const AttendanceRegularizationSchema =
  new Schema<IAttendanceRegularization>(
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

      attendanceDailyId: {
        type: Schema.Types.ObjectId,
        ref: "AttendanceDaily",
        required: true,
        index: true,
      },

      attendanceDate: {
        type: Date,
        required: true,
        index: true,
      },

      // Existing attendance values
      currentCheckIn: {
        type: Date,
      },

      currentCheckOut: {
        type: Date,
      },

      // Requested values
      requestedCheckIn: {
        type: Date,
      },

      requestedCheckOut: {
        type: Date,
      },

      regularizationType: {
        type: String,
        enum: Object.values(RegularizationType),
        required: true,
      },

      requestSource: {
        type: String,
        enum: Object.values(RequestSource),
        default: RequestSource.WEB,
        required: true,
      },

      reason: {
        type: String,
        required: true,
        trim: true,
      },

      attachments: [
        {
          fileName: {
            type: String,
            trim: true,
          },

          fileUrl: {
            type: String,
            trim: true,
          },
        },
      ],

      approverId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
        index: true,
      },

      status: {
        type: String,
        enum: Object.values(RegularizationStatus),
        default: RegularizationStatus.PENDING,
        required: true,
        index: true,
      },

      reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },

      reviewedAt: {
        type: Date,
      },

      reviewRemarks: {
        type: String,
        trim: true,
      },

      approvalHistory: [
        {
          action: {
            type: String,
            enum: Object.values(ApprovalAction),
            required: true,
          },

          previousStatus: {
            type: String,
            enum: Object.values(RegularizationStatus),
          },

          newStatus: {
            type: String,
            enum: Object.values(RegularizationStatus),
          },

          performedBy: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
          },

          remarks: {
            type: String,
            trim: true,
          },

          performedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      isAttendanceUpdated: {
        type: Boolean,
        default: false,
      },

      attendanceUpdatedAt: {
        type: Date,
      },

      payrollAffected: {
        type: Boolean,
        default: false,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },

      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },

      isDeleted: {
        type: Boolean,
        default: false,
        index: true,
      },

      deletedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

/**
 * INDEXES
 */

// Prevent multiple active requests for the same attendance
AttendanceRegularizationSchema.index(
  {
    companyId: 1,
    employeeId: 1,
    attendanceDailyId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: {
        $in: ["DRAFT", "PENDING"],
      },
      isDeleted: false,
    },
  },
);

// Employee request history
AttendanceRegularizationSchema.index({
  companyId: 1,
  employeeId: 1,
  createdAt: -1,
});

// Employee requests by status
AttendanceRegularizationSchema.index({
  companyId: 1,
  employeeId: 1,
  status: 1,
  createdAt: -1,
});

// Pending approvals for an approver
AttendanceRegularizationSchema.index({
  companyId: 1,
  approverId: 1,
  status: 1,
  createdAt: -1,
});

// Admin reports
AttendanceRegularizationSchema.index({
  companyId: 1,
  status: 1,
  createdAt: -1,
});

// Attendance lookup
AttendanceRegularizationSchema.index({
  companyId: 1,
  attendanceDailyId: 1,
});

// Attendance date reports
AttendanceRegularizationSchema.index({
  companyId: 1,
  attendanceDate: -1,
});

// Reviewer audit
AttendanceRegularizationSchema.index({
  companyId: 1,
  reviewedBy: 1,
  reviewedAt: -1,
});

// Attendance sync jobs
AttendanceRegularizationSchema.index({
  companyId: 1,
  isAttendanceUpdated: 1,
  status: 1,
});

// Payroll recalculation queue
AttendanceRegularizationSchema.index({
  companyId: 1,
  payrollAffected: 1,
});

// Soft delete queries
AttendanceRegularizationSchema.index({
  companyId: 1,
  isDeleted: 1,
});
