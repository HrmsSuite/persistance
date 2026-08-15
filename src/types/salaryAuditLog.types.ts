import { Types } from "mongoose";

/**
 * Entity on which the audit action occurred.
 */
export type SalaryAuditEntity =
  | "SALARY_COMPONENT"
  | "SALARY_STRUCTURE"
  | "EMPLOYEE_SALARY";

/**
 * Action performed on a salary-related entity.
 */
export type SalaryAuditAction =
  | "CREATED"
  | "UPDATED"
  | "REVISED"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVATED"
  | "DEACTIVATED"
  | "ARCHIVED"
  | "CANCELLED";

/**
 * Source from which the action originated.
 */
export type SalaryAuditSource = "WEB" | "MOBILE" | "API" | "SYSTEM";

/**
 * Represents a single changed field.
 *
 * Example:
 *
 * {
 *   field: "components.HRA.amount",
 *   oldValue: 25000,
 *   newValue: 30000
 * }
 */
export interface SalaryAuditChange {
  field: string;
  oldValue?: unknown;
  newValue?: unknown;
}

/**
 * Immutable salary audit record.
 *
 * This collection is responsible only for maintaining
 * the history of salary-related actions.
 */
export interface SalaryAuditLog {
  _id?: Types.ObjectId;

  /**
   * Multi-tenant company reference.
   */
  companyId: Types.ObjectId;

  /**
   * Type of salary entity affected.
   */
  entityType: SalaryAuditEntity;

  /**
   * ID of the affected entity.
   *
   * Examples:
   * salaryComponentId
   * salaryStructureId
   * employeeSalaryId
   */
  entityId: Types.ObjectId;

  /**
   * Employee affected by the action.
   *
   * Mainly applicable to EMPLOYEE_SALARY.
   */
  employeeId?: Types.ObjectId;

  /**
   * Action performed.
   */
  action: SalaryAuditAction;

  /**
   * User who performed the action.
   *
   * Optional because SYSTEM actions may not
   * have a human user.
   */
  performedBy?: Types.ObjectId;

  /**
   * Source of the action.
   */
  source: SalaryAuditSource;

  /**
   * Human-readable reason for the action.
   *
   * Example:
   * "Annual salary revision"
   */
  reason?: string;

  /**
   * Additional comments.
   */
  comments?: string;

  /**
   * Fields changed during the operation.
   */
  changedFields?: string[];

  /**
   * Detailed field-level changes.
   */
  changes?: SalaryAuditChange[];

  /**
   * Complete state before the change.
   *
   * Useful for restoring/reviewing historical data.
   */
  before?: Record<string, unknown>;

  /**
   * Complete state after the change.
   */
  after?: Record<string, unknown>;

  /**
   * Optional request/correlation ID.
   *
   * Useful for tracing a salary operation
   * across services.
   */
  requestId?: string;

  /**
   * Optional metadata for future requirements.
   */
  metadata?: Record<string, unknown>;

  /**
   * Audit creation timestamp.
   *
   * Audit records should be append-only.
   */
  createdAt?: Date;
}
