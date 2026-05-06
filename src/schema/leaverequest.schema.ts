import { Schema } from "mongoose";
import {
  LEAVE_TYPE_NAMES,
  LEAVE_STATUS,
  APPROVAL_ROLES,
  APPROVAL_STEP_STATUS,
} from "../types/constant.typings";
import { ILeaveRequest } from "../types";
// APPROVAL STEP SUB SCHEMA 
const ApprovalStepSchema = new Schema(
  {
    level: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
    role: {
      type: String,
      enum: APPROVAL_ROLES,
      required: true,
    },
    approverId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: APPROVAL_STEP_STATUS,
      required: true,
      default: "pending",
    },
    remarks: {
      type: String,
      trim: true,
      default: null,
    },
    actedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);
 
// AUDIT SUB SCHEMA 

const AuditSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  { _id: false },
);
 
// LEAVE REQUEST SCHEMA 

export const LeaveRequestSchema = new Schema<ILeaveRequest>(
  {
    // ── Identity
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    // ── Leave Details
    leaveTypeName: {
      type: String,
      enum: LEAVE_TYPE_NAMES,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
      min: 0.5,
    },
    isHalfDay: {
      type: Boolean,
      required: true,
      default: false,
    },
    halfDaySession: {
      type: String,
      enum: ["morning", "afternoon"],
      default: null,
    },

    // ── Supporting Info
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    attachmentUrl: {
      type: String,
      default: null,
    },

    // ── Status & Approval
    status: {
      type: String,
      enum: LEAVE_STATUS,
      required: true,
      default: "pending",
    },
    approvalChain: {
      type: [ApprovalStepSchema],
      required: true,
      default: [],
    },
    currentLevel: {
      type: Number,
      enum: [1, 2],
      required: true,
      default: 1,
    },

    // ── Handover
    handoverEmployeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    // ── Audit
    audit: {
      type: AuditSchema,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);
 
// INDEXES 

// Employee leave history
LeaveRequestSchema.index({ companyId: 1, employeeId: 1, startDate: -1 });

// Manager pending approvals
LeaveRequestSchema.index({ managerId: 1, status: 1 });

// Admin pending approvals
LeaveRequestSchema.index({ companyId: 1, status: 1, currentLevel: 1 });

// Date range queries — calendar view
LeaveRequestSchema.index({ companyId: 1, startDate: 1, endDate: 1, status: 1 });

// Leave type wise reporting
LeaveRequestSchema.index({ companyId: 1, leaveTypeName: 1, status: 1 });