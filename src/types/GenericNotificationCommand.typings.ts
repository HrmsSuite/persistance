import {
  NotificationChannel,
  NotificationEntityType,
  NotificationPriority,
  NotificationType,
} from "../constants";
import {
  NotificationAction,
  NotificationMetadata,
  NotificationRecipientEventPayload,
  NotificationTemplateReference,
} from "./notification-shared.typings";

export interface GenericNotificationCommand {
  tenantId: string;

  type?: NotificationType;
  priority?: NotificationPriority;

  title: string;
  message: string;
  body?: string;

  channels: NotificationChannel[];
  recipients: NotificationRecipientEventPayload[];

  entityType?: NotificationEntityType;
  entityId?: string;

  sourceService: string;
  sourceModule?: string;
  sourceEvent?: string;

  eventId: string;
  eventVersion: number;
  idempotencyKey: string;

  correlationId?: string;
  causationId?: string;
  requestId?: string;

  template?: NotificationTemplateReference;
  actions?: NotificationAction[];
  metadata?: NotificationMetadata;

  scheduledAt?: string;
  expiresAt?: string;

  maxAttempts?: number;
}
