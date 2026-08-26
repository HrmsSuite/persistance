import { Types } from "mongoose";
import {
  NotificationChannel,
  NotificationEntityType,
  NotificationPriority,
  NotificationStatus,
  NotificationType,
} from "../constants";
import {
  NotificationAction,
  NotificationMetadata,
  NotificationTemplateReference,
} from "./notification-shared.typings";

export type NotificationId = Types.ObjectId;
export type NotificationTenantId = Types.ObjectId;
export type NotificationActorId = Types.ObjectId;
export type NotificationEntityId = Types.ObjectId;

export interface Notification {
  _id: NotificationId;

  tenantId: NotificationTenantId;
  actorId?: NotificationActorId;

  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;

  title: string;
  message: string;
  body?: string;

  channels: NotificationChannel[];

  entityType?: NotificationEntityType;
  entityId?: NotificationEntityId;

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
  actions?: NotificationAction[];
  metadata?: NotificationMetadata;

  scheduledAt?: Date;
  expiresAt?: Date;

  processingStartedAt?: Date;
  processedAt?: Date;

  attemptCount: number;
  maxAttempts: number;

  lastError?: string;

  createdAt: Date;
  updatedAt: Date;
}
