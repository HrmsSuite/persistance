import { model } from "mongoose";

import { SalaryAuditLog } from "../types/salaryAuditLog.types"; 
import { SalaryAuditLogSchema } from "../schema";

export const SalaryAuditLogModel = model<SalaryAuditLog>(
  "SalaryAuditLog",
  SalaryAuditLogSchema,
  "salary_audit_logs",
);