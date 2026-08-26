import { Types } from "mongoose";

import type { NotificationRecipientInput } from "./notification-recipient.typings.js";
import {
  NotificationAuditAction,
  NotificationChannel,
  NotificationEntityType,
  NotificationPriority,
  NotificationType,
} from "../constants/notification-status.typings.js";
import {
  NotificationMetadata,
  NotificationTemplateReference,
} from "./notification-shared.typings.js";

export interface CreateNotificationInput {
  tenantId: Types.ObjectId;
  actorId?: Types.ObjectId;

  type?: NotificationType;
  priority?: NotificationPriority;

  title: string;
  message: string;
  body?: string;

  channels: NotificationChannel[];
  recipients: NotificationRecipientInput[];

  entityType?: NotificationEntityType;
  entityId?: Types.ObjectId;

  sourceService: string;
  sourceModule?: string;
  sourceEvent?: string;

  eventId?: string;
  eventVersion?: number;

  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  requestId?: string;

  template?: NotificationTemplateReference;
  actions?: NotificationAuditAction[];
  metadata?: NotificationMetadata;

  scheduledAt?: Date;
  expiresAt?: Date;

  maxAttempts?: number;
}
