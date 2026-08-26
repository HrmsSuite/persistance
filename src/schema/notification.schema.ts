import { Schema } from "mongoose";

import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_DEFAULTS,
  NOTIFICATION_ENTITY_TYPES,
  NOTIFICATION_LIMITS,
  NOTIFICATION_PRIORITIES,
  NOTIFICATION_STATUSES,
  NOTIFICATION_TYPES,
} from "../constants/notification-status.typings.js";
import {
  NotificationActionSchema,
  NotificationTemplateSchema,
} from "./notification-components.schema.js";

function hasUniqueChannels(value: unknown): boolean {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.length < 1 || value.length > NOTIFICATION_LIMITS.MAX_CHANNELS) {
    return false;
  }

  return new Set(value).size === value.length;
}

function hasValidActions(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  return (
    Array.isArray(value) && value.length <= NOTIFICATION_LIMITS.MAX_ACTIONS
  );
}

export const NotificationSchema = new Schema(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    actorId: {
      type: Schema.Types.ObjectId,
    },

    type: {
      type: String,
      required: true,
      enum: NOTIFICATION_TYPES,
      default: NOTIFICATION_DEFAULTS.TYPE,
    },

    priority: {
      type: String,
      required: true,
      enum: NOTIFICATION_PRIORITIES,
      default: NOTIFICATION_DEFAULTS.PRIORITY,
    },

    status: {
      type: String,
      required: true,
      enum: NOTIFICATION_STATUSES,
      default: NOTIFICATION_DEFAULTS.STATUS,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: NOTIFICATION_LIMITS.TITLE_MAX_LENGTH,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: NOTIFICATION_LIMITS.MESSAGE_MAX_LENGTH,
    },

    body: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.BODY_MAX_LENGTH,
    },

    channels: {
      type: [
        {
          type: String,
          enum: NOTIFICATION_CHANNELS,
        },
      ],
      required: true,
      validate: {
        validator: hasUniqueChannels,
        message: "Notification channels must be unique and non-empty.",
      },
    },

    entityType: {
      type: String,
      enum: NOTIFICATION_ENTITY_TYPES,
    },

    entityId: {
      type: Schema.Types.ObjectId,
    },

    sourceService: {
      type: String,
      required: true,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.SOURCE_SERVICE_MAX_LENGTH,
    },

    sourceModule: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.SOURCE_MODULE_MAX_LENGTH,
    },

    sourceEvent: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.SOURCE_EVENT_MAX_LENGTH,
    },

    eventId: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.IDEMPOTENCY_KEY_MAX_LENGTH,
    },

    eventVersion: {
      type: Number,
      min: 1,
      default: 1,
    },

    idempotencyKey: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.IDEMPOTENCY_KEY_MAX_LENGTH,
    },

    correlationId: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.CORRELATION_ID_MAX_LENGTH,
    },

    causationId: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.CORRELATION_ID_MAX_LENGTH,
    },

    requestId: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.REQUEST_ID_MAX_LENGTH,
    },

    template: {
      type: NotificationTemplateSchema,
      required: false,
    },

    actions: {
      type: [NotificationActionSchema],
      default: undefined,
      validate: {
        validator: hasValidActions,
        message: `Maximum ${NOTIFICATION_LIMITS.MAX_ACTIONS} actions are allowed.`,
      },
    },

    metadata: {
      type: Schema.Types.Mixed,
    },

    scheduledAt: {
      type: Date,
    },

    expiresAt: {
      type: Date,
    },

    processingStartedAt: {
      type: Date,
    },

    processedAt: {
      type: Date,
    },

    attemptCount: {
      type: Number,
      required: true,
      min: 0,
      default: NOTIFICATION_DEFAULTS.ATTEMPT_COUNT,
    },

    maxAttempts: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      default: NOTIFICATION_DEFAULTS.MAX_ATTEMPTS,
    },

    lastError: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.ERROR_MESSAGE_MAX_LENGTH,
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
);
NotificationSchema.index(
  {
    tenantId: 1,
    createdAt: -1,
  },
  {
    name: "idx_notification_tenant_created",
  },
);

NotificationSchema.index(
  {
    status: 1,
    scheduledAt: 1,
  },
  {
    name: "idx_notification_status_scheduled",
  },
);

NotificationSchema.index(
  {
    status: 1,
    expiresAt: 1,
  },
  {
    name: "idx_notification_status_expires",
  },
);

NotificationSchema.index(
  {
    tenantId: 1,
    entityType: 1,
    entityId: 1,
    createdAt: -1,
  },
  {
    name: "idx_notification_tenant_entity_created",
  },
);

NotificationSchema.index(
  {
    tenantId: 1,
    sourceModule: 1,
    sourceEvent: 1,
    createdAt: -1,
  },
  {
    name: "idx_notification_tenant_source_created",
  },
);
NotificationSchema.index(
  {
    tenantId: 1,
    idempotencyKey: 1,
  },
  {
    unique: true,
    name: "uq_notification_tenant_idempotency",
    partialFilterExpression: {
      idempotencyKey: {
        $exists: true,
        $type: "string",
      },
    },
  },
);
NotificationSchema.index(
  {
    tenantId: 1,
    sourceEvent: 1,
    eventId: 1,
  },
  {
    unique: true,
    name: "uq_notification_tenant_source_event",
    partialFilterExpression: {
      sourceEvent: {
        $exists: true,
        $type: "string",
      },
      eventId: {
        $exists: true,
        $type: "string",
      },
    },
  },
);
