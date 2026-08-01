import { Schema } from "mongoose";
import {
  APPROVAL_LEVELS,
  GENDER_ELIGIBILITY,
  ILeavePolicy,
  LEAVE_TYPE_NAMES,
} from "../types";

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

// LEAVE POLICY SCHEMA

export const LeavePolicySchema = new Schema<ILeavePolicy>(
  {
    // ── Identity
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    leaveTypeName: {
      type: String,
      enum: LEAVE_TYPE_NAMES,
      required: true,
    },

    // ── Quota
    maxDaysPerYear: {
      type: Number,
      required: true,
      min: 0,
    },
    maxDaysPerMonth: {
      type: Number,
      default: null,
      min: 0,
    },
    maxDaysPerApplication: {
      type: Number,
      default: null,
      min: 0,
    },
    minDaysPerApplication: {
      type: Number,
      required: true,
      default: 0.5,
      min: 0.5,
    },

    // ── Rules
    carryForwardAllowed: {
      type: Boolean,
      required: true,
      default: false,
    },
    maxCarryForwardDays: {
      type: Number,
      default: null,
      min: 0,
    },
    encashmentAllowed: {
      type: Boolean,
      required: true,
      default: false,
    },
    maxEncashmentDays: {
      type: Number,
      default: null,
      min: 0,
    },

    // ── Eligibility
    genderEligibility: {
      type: String,
      enum: GENDER_ELIGIBILITY,
      required: true,
      default: "all",
    },
    probationEligible: {
      type: Boolean,
      required: true,
      default: false,
    },
    minServiceDays: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // ── Notice
    advanceNoticeDays: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    backdatedAllowed: {
      type: Boolean,
      required: true,
      default: false,
    },
    maxBackdatedDays: {
      type: Number,
      default: null,
      min: 0,
    },

    // ── Approval
    approvalLevels: {
      type: Number,
      enum: APPROVAL_LEVELS,
      required: true,
      default: 2,
    },
    approvalConfig: [
      {
        level: { type: Number, required: true },
        type: {
          type: String,
          enum: [
            "direct_manager",
            "manager_of_manager",
            "department_head",
            "admin",
          ],
          required: true,
        },
      },
    ],

    // ── Meta
    audit: {
      type: AuditSchema,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

// INDEXES

// One policy per leave type per company
LeavePolicySchema.index({ companyId: 1, leaveTypeName: 1 }, { unique: true });

// Active policies fetch
LeavePolicySchema.index({ companyId: 1, isActive: 1 });

// Gender specific policies
LeavePolicySchema.index({ companyId: 1, genderEligibility: 1 });
