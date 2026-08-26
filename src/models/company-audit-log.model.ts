import { model, type Model } from "mongoose";
import { CompanyAuditLogSchema } from "../schema";
import { CompanyAuditLog } from "../types";

/**
 * Mongoose model for immutable company audit events.
 *
 * @remarks
 * Audit records are tenant-scoped through `companyId`.
 *
 * Application services should treat audit records as append-only:
 * create new events instead of modifying existing events.
 */
export const CompanyAuditLogModel: Model<CompanyAuditLog> =
  model<CompanyAuditLog>("CompanyAuditLog", CompanyAuditLogSchema);
