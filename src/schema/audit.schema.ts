import { Schema, model } from "mongoose";

import { AuditActorSchema } from "./audit-actor.schema";
import { AuditChangeSchema } from "./audit-change.schema";
import { AuditContextSchema } from "./audit-context.schema";
import { AuditRequestSchema } from "./audit-request.schema";
import { AuditResourceSchema } from "./audit-resource.schema";
import { AuditRelatedResourceSchema } from "./audit-related-resource.schema";

export const AuditSchema = new Schema(
  {
    /**
     * Business resource
     */
    resource: {
      type: AuditResourceSchema,
      required: true,
    },

    /**
     * Action
     * create
     * update
     * delete
     * approve
     * reject
     */
    action: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * User / System
     */
    actor: {
      type: AuditActorSchema,
      required: true,
    },

    /**
     * Human readable message
     */
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    /**
     * Optional description
     */
    description: {
      type: String,
      default: null,
    },

    /**
     * info
     * success
     * warning
     * error
     * critical
     */
    severity: {
      type: String,
      default: "info",
    },

    /**
     * Before / After values
     */
    changes: {
      type: [AuditChangeSchema],
      default: [],
    },

    /**
     * Module specific payload
     */
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },

    /**
     * Company / Project / Department
     */
    context: {
      type: AuditContextSchema,
      required: true,
    },

    /**
     * HTTP request details
     */
    request: {
      type: AuditRequestSchema,
      default: undefined,
    },

    /**
     * Related business resources
     */
    relatedResources: {
      type: [AuditRelatedResourceSchema],
      default: [],
    },

    /**
     * Search tags
     */
    tags: {
      type: [String],
      default: [],
    },

    /**
     * Actual event time
     */
    occurredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "audit_logs",
    timestamps: true,
    versionKey: false,
  },
);

/* -------------------------------------------------------------------------- */
/*                                   Indexes                                  */
/* -------------------------------------------------------------------------- */

/**
 * Company Timeline
 */
AuditSchema.index({
  "context.companyId": 1,
  occurredAt: -1,
});

/**
 * Resource History
 */
AuditSchema.index({
  "resource.id": 1,
  occurredAt: -1,
});

/**
 * Module Timeline
 */
AuditSchema.index({
  "resource.module": 1,
  occurredAt: -1,
});

/**
 * Entity Timeline
 */
AuditSchema.index({
  "resource.entity": 1,
  occurredAt: -1,
});

/**
 * Actor Timeline
 */
AuditSchema.index({
  "actor.id": 1,
  occurredAt: -1,
});

/**
 * Action Filter
 */
AuditSchema.index({
  action: 1,
  occurredAt: -1,
});

/**
 * Severity Filter
 */
AuditSchema.index({
  severity: 1,
  occurredAt: -1,
});

/**
 * Tag Search
 */
AuditSchema.index({
  tags: 1,
});

/**
 * Text Search
 */
AuditSchema.index({
  summary: "text",
  description: "text",
});

export default model("AuditLog", AuditSchema);
