import { Schema } from "mongoose";

import {
  SalaryAuditLog,
  SalaryAuditEntity,
  SalaryAuditAction,
  SalaryAuditSource,
  SalaryAuditChange,
} from "../types/salaryAuditLog.types";

const salaryAuditEntityEnum: SalaryAuditEntity[] = [
  "SALARY_COMPONENT",
  "SALARY_STRUCTURE",
  "EMPLOYEE_SALARY",
];

const salaryAuditActionEnum: SalaryAuditAction[] = [
  "CREATED",
  "UPDATED",
  "REVISED",
  "APPROVED",
  "REJECTED",
  "ACTIVATED",
  "DEACTIVATED",
  "ARCHIVED",
  "CANCELLED",
];

const salaryAuditSourceEnum: SalaryAuditSource[] = [
  "WEB",
  "MOBILE",
  "API",
  "SYSTEM",
];

/**
 * Field-level salary change.
 *
 * Example:
 *
 * {
 *   field: "totals.gross",
 *   oldValue: 500000,
 *   newValue: 550000
 * }
 */
const salaryAuditChangeSchema = new Schema<SalaryAuditChange>(
  {
    field: {
      type: String,
      required: true,
      trim: true,
    },

    oldValue: {
      type: Schema.Types.Mixed,
    },

    newValue: {
      type: Schema.Types.Mixed,
    },
  },
  {
    _id: false,
  },
);

/**
 * Salary Audit Log Schema
 *
 * This collection should be treated as append-only.
 */
export const SalaryAuditLogSchema = new Schema<SalaryAuditLog>(
  {
    /**
     * Multi-tenant company reference.
     */
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    /**
     * Salary entity affected.
     */
    entityType: {
      type: String,
      enum: salaryAuditEntityEnum,
      required: true,
      index: true,
    },

    /**
     * ID of the affected salary entity.
     */
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    /**
     * Employee affected by the salary operation.
     */
    employeeId: {
      type: Schema.Types.ObjectId,
      index: true,
    },

    /**
     * Action performed.
     */
    action: {
      type: String,
      enum: salaryAuditActionEnum,
      required: true,
      index: true,
    },

    /**
     * User who performed the operation.
     *
     * Optional for SYSTEM actions.
     */
    performedBy: {
      type: Schema.Types.ObjectId,
      index: true,
    },

    /**
     * Where the operation originated.
     */
    source: {
      type: String,
      enum: salaryAuditSourceEnum,
      required: true,
    },

    /**
     * Reason for the operation.
     */
    reason: {
      type: String,
      trim: true,
    },

    /**
     * Additional comments.
     */
    comments: {
      type: String,
      trim: true,
    },

    /**
     * List of changed field paths.
     */
    changedFields: {
      type: [String],
      default: [],
    },

    /**
     * Detailed field-level changes.
     */
    changes: {
      type: [salaryAuditChangeSchema],
      default: [],
    },

    /**
     * State before the operation.
     */
    before: {
      type: Schema.Types.Mixed,
    },

    /**
     * State after the operation.
     */
    after: {
      type: Schema.Types.Mixed,
    },

    /**
     * Request/correlation ID.
     */
    requestId: {
      type: String,
      trim: true,
      index: true,
    },

    /**
     * Additional extensible metadata.
     */
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    /**
     * Audit records need only createdAt.
     * updatedAt should not exist because audit records
     * are immutable.
     */
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

/**
 * Main query pattern:
 *
 * "Show me all changes made to this entity."
 */
SalaryAuditLogSchema.index({
  companyId: 1,
  entityType: 1,
  entityId: 1,
  createdAt: -1,
});

/**
 * Employee salary history:
 *
 * "Show me everything that happened to this employee's salary."
 */
SalaryAuditLogSchema.index({
  companyId: 1,
  employeeId: 1,
  createdAt: -1,
});

/**
 * Company-wide salary audit history.
 */
SalaryAuditLogSchema.index({
  companyId: 1,
  createdAt: -1,
});