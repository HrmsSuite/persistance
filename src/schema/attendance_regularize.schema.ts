import { Schema } from "mongoose";
import { IAttendanceRegularization } from "../types";

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

      currentCheckIn: {
        type: Date,
      },

      currentCheckOut: {
        type: Date,
      },

      requestedCheckIn: {
        type: Date,
      },

      requestedCheckOut: {
        type: Date,
      },

      reason: {
        type: String,
        required: true,
        trim: true,
      },

      regularizationType: {
        type: String,
        enum: ["CHECK_IN", "CHECK_OUT", "BOTH", "MISSED_PUNCH"],
        required: true,
      },

      requestSource: {
        type: String,
        enum: ["WEB", "MOBILE", "ADMIN"],
        required: true,
        default: "WEB",
      },

      status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
        required: true,
        default: "PENDING",
        index: true,
      },

      reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },

      reviewedAt: {
        type: Date,
      },

      reviewComments: {
        type: String,
        trim: true,
      },

      approvalHistory: [
        {
          action: {
            type: String,
            enum: ["SUBMITTED", "APPROVED", "REJECTED", "RESUBMITTED"],
            required: true,
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
            required: true,
          },
        },
      ],
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

/**
 * INDEXES
 */

// Prevent multiple pending requests for same employee/date
AttendanceRegularizationSchema.index(
  {
    companyId: 1,
    employeeId: 1,
    attendanceDate: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: "PENDING",
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

// Admin approval queue
AttendanceRegularizationSchema.index({
  companyId: 1,
  status: 1,
  createdAt: -1,
});

// Attendance date reports/search
AttendanceRegularizationSchema.index({
  companyId: 1,
  attendanceDate: -1,
});

// Fast lookup by attendance daily record
AttendanceRegularizationSchema.index({
  companyId: 1,
  attendanceDailyId: 1,
});

// Audit / reviewer reports
AttendanceRegularizationSchema.index({
  companyId: 1,
  reviewedBy: 1,
  reviewedAt: -1,
});
