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

      attendanceDate: { type: Date, required: true, index: true },
      requestedCheckIn: { type: Date },
      requestedCheckOut: { type: Date },

      reason: { type: String, required: true, trim: true },

      status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        required: true,
        default: "PENDING",
        index: true,
      },

      approvedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
      managerRemarks: { type: String, trim: true },
      approvedAt: { type: Date },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

// One active regularization request per employee per day
// (does not block re-requests after rejection — enforce that in service layer if needed)
AttendanceRegularizationSchema.index({
  companyId: 1,
  employeeId: 1,
  attendanceDate: 1,
  status: 1,
});

// Manager inbox — fetch all pending requests under a company
AttendanceRegularizationSchema.index({
  companyId: 1,
  status: 1,
  createdAt: -1,
});
