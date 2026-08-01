import {
  AuditAction,
  AuditActorType,
  AuditDevice,
  AuditEntity,
  AuditMetadata,
  AuditModule,
  AuditSeverity,
  AuditValue,
  ObjectId,
} from "../types";

export interface AuditResource {
  /**
   * employee
   * leave
   * attendance
   * payroll
   * project
   * task
   */
  module: AuditModule;

  /**
   * employee
   * leave-request
   * task
   * sprint
   * project
   */
  entity: AuditEntity;

  /**
   * Resource Id
   */
  id: ObjectId;

  /**
   * Human readable name
   */
  name?: string;

  /**
   * Business code
   * EMP001
   * TASK-101
   * PROJ-25
   */
  code?: string;

  /**
   * Optional parent resource.
   *
   * Example:
   *
   * Project
   *    └── Sprint
   *          └── Task
   */
  parent?: AuditResource;
}

export interface AuditActor {
  id: ObjectId;

  type: AuditActorType;

  name?: string;

  email?: string;
}

export interface AuditFieldChange {
  field: string;

  previous?: AuditValue;

  current?: AuditValue;
}

export interface AuditRequest {
  ip?: string;

  method?: string;

  endpoint?: string;

  userAgent?: string;

  browser?: string;

  os?: string;

  device?: AuditDevice;

  requestId?: string;

  correlationId?: string;
}

export interface AuditContext {
  companyId: ObjectId;

  tenantId?: ObjectId;

  workspaceId?: ObjectId;

  departmentId?: ObjectId;

  employeeId?: ObjectId;

  projectId?: ObjectId;

  sprintId?: ObjectId;

  taskId?: ObjectId;
}

/**
 * Published by feature modules.
 *
 * Employee
 * Leave
 * Attendance
 * Payroll
 * Calendar
 * Project
 * Task
 */
export interface AuditEvent {
  resource: AuditResource;

  action: AuditAction;

  actor: AuditActor;

  /**
   * Short readable message
   */
  summary: string;

  /**
   * Optional detailed description
   */
  description?: string;

  severity?: AuditSeverity;

  /**
   * Before / After values
   */
  changes?: AuditFieldChange[];

  /**
   * Module specific payload
   */
  metadata?: AuditMetadata;

  /**
   * Company / Project / Department
   */
  context: AuditContext;

  /**
   * HTTP request information
   */
  request?: AuditRequest;

  /**
   * Search tags
   */
  tags?: string[];

  /**
   * Optional reference to another business entity.
   * Example:
   * - Leave linked to Employee
   * - Task linked to Project
   * - Attendance linked to Shift
   */
  relatedResources?: AuditResource[];
}

export interface AuditPublisher {
  publish(event: AuditEvent): Promise<void>;
}

/**
 * Internal to Audit module.
 *
 * Never expose this to feature modules.
 */
export interface AuditRecord extends AuditEvent {
  _id: ObjectId;

  /**
   * Actual event time
   */
  occurredAt: Date;

  createdAt: Date;

  updatedAt: Date;
}

export interface AuditQuery {
  companyId: ObjectId;

  page?: number;

  limit?: number;

  module?: AuditModule;

  entity?: AuditEntity;

  action?: AuditAction;

  actorId?: ObjectId;

  severity?: AuditSeverity;

  from?: Date;

  to?: Date;

  search?: string;

  tags?: string[];

  sortBy?: string;

  sortOrder?: "asc" | "desc";
}

export interface AuditPagination<T = AuditRecord> {
  items: T[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}
