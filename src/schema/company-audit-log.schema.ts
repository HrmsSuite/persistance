import { Schema } from "mongoose";

import {
  COMPANY_AUDIT_ACTIONS,
  COMPANY_AUDIT_ACTOR_TYPES,
  COMPANY_AUDIT_ENTITY_TYPES,
} from "../types/index.js";

import type { CompanyAuditLog } from "../types/index.js";

export const CompanyAuditLogSchema = new Schema<CompanyAuditLog>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    actorId: {
      type: Schema.Types.ObjectId,
    },

    actorType: {
      type: String,
      required: true,
      enum: COMPANY_AUDIT_ACTOR_TYPES,
    },

    action: {
      type: String,
      required: true,
      enum: COMPANY_AUDIT_ACTIONS,
    },

    entityType: {
      type: String,
      required: true,
      enum: COMPANY_AUDIT_ENTITY_TYPES,
    },

    entityId: {
      type: Schema.Types.ObjectId,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },

    ipAddress: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    userAgent: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    strict: true,
    versionKey: false,
  },
);

CompanyAuditLogSchema.index(
  {
    companyId: 1,
    createdAt: -1,
  },
  {
    name: "idx_audit_company_created",
  },
);

CompanyAuditLogSchema.index(
  {
    companyId: 1,
    action: 1,
    createdAt: -1,
  },
  {
    name: "idx_audit_company_action_created",
  },
);

CompanyAuditLogSchema.index(
  {
    companyId: 1,
    entityType: 1,
    entityId: 1,
    createdAt: -1,
  },
  {
    name: "idx_audit_company_entity_created",
  },
);

CompanyAuditLogSchema.index(
  {
    companyId: 1,
    actorId: 1,
    createdAt: -1,
  },
  {
    name: "idx_audit_company_actor_created",
  },
);
