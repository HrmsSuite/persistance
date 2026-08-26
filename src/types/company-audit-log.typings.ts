import { Types } from "mongoose";

export type CompanyAuditLogId = Types.ObjectId;
export type CompanyAuditActorId = Types.ObjectId;
export type CompanyAuditEntityId = Types.ObjectId;

export const COMPANY_AUDIT_ACTIONS = [
  "COMPANY_REGISTERED",
  "COMPANY_EMAIL_VERIFIED",
  "COMPANY_ACTIVATED",
  "COMPANY_SUSPENDED",
  "COMPANY_REACTIVATED",
  "COMPANY_PROFILE_UPDATED",

  "PASSWORD_CHANGED",
  "PASSWORD_RESET",
  "LOGIN_SUCCESS",
  "LOGIN_FAILED",
  "LOGOUT",

  "COMPANY_LOGO_UPLOADED",
  "COMPANY_LOGO_UPDATED",
  "COMPANY_LOGO_DELETED",
  "FILE_UPLOADED",
  "FILE_DELETED",
  "COMPANY_ONBOARDING_COMPLETED",

  "SUBSCRIPTION_CREATED",
  "SUBSCRIPTION_UPGRADED",
  "SUBSCRIPTION_DOWNGRADED",
  "SUBSCRIPTION_CANCELLED",

  "USER_INVITED",
  "USER_CREATED",
  "USER_UPDATED",
  "USER_DEACTIVATED",

  "WORK_LOCATION_CREATED",
  "WORK_LOCATION_UPDATED",
  "WORK_LOCATION_DELETED",
] as const;

export type CompanyAuditAction = (typeof COMPANY_AUDIT_ACTIONS)[number];

export const COMPANY_AUDIT_ACTOR_TYPES = [
  "USER",
  "SYSTEM",
  "SUPER_ADMIN",
  "API",
] as const;

export type CompanyAuditActorType = (typeof COMPANY_AUDIT_ACTOR_TYPES)[number];

export const COMPANY_AUDIT_ENTITY_TYPES = [
  "COMPANY",
  "USER",
  "EMPLOYEE",
  "FILE",
  "SUBSCRIPTION",
  "WORK_LOCATION",
  "EMAIL_VERIFICATION",
  "DEPARTMENT",
  "DESIGNATION",
  "TEAM",
  "SHIFT",
  "ATTENDANCE",
  "LEAVE",
  "PAYROLL",
  "ASSET",
] as const;

export type CompanyAuditEntityType =
  (typeof COMPANY_AUDIT_ENTITY_TYPES)[number];

export type CompanyAuditMetadata = Record<string, unknown>;

export interface CompanyAuditLog {
  _id: CompanyAuditLogId;

  companyId: Types.ObjectId;

  actorId?: CompanyAuditActorId;
  actorType: CompanyAuditActorType;

  action: CompanyAuditAction;
  entityType: CompanyAuditEntityType;
  entityId?: CompanyAuditEntityId;

  metadata?: CompanyAuditMetadata;

  ipAddress?: string;
  userAgent?: string;

  createdAt: Date;
}
