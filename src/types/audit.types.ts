import { Types } from "mongoose";

export type ObjectId = Types.ObjectId;

/**
 * Dynamic values
 */
export type AuditValue = unknown;

/**
 * Free-form metadata
 */
export type AuditMetadata = Record<string, unknown>;

/**
 * Examples:
 * employee
 * attendance
 * leave
 * payroll
 * project
 * task
 */
export type AuditModule = string;

/**
 * Examples:
 * employee
 * leave-request
 * task
 * sprint
 * project
 */
export type AuditEntity = string;

/**
 * Examples:
 * create
 * update
 * delete
 * approve
 * reject
 * assign
 * archive
 */
export type AuditAction = string;

/**
 * Actor
 */
export type AuditActorType =
    | "user"
    | "system"
    | "scheduler"
    | "integration"
    | "api";

/**
 * Log severity
 */
export type AuditSeverity =
    | "info"
    | "success"
    | "warning"
    | "error"
    | "critical";

/**
 * Device
 */
export type AuditDevice =
    | "desktop"
    | "mobile"
    | "tablet"
    | "server"
    | "unknown";