import { model } from "mongoose";
import { AuditRecord } from "../types";
import { AuditSchema } from "../schema";

export const AuditModel = model<AuditRecord>("AuditLogs", AuditSchema);

export default AuditModel;
