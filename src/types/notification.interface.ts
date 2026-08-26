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
} from "./notification-shared.typings";

export interface UpdateNotificationInput {
  type?: NotificationType;
  priority?: NotificationPriority;

  title?: string;
  message?: string;
  body?: string;

  actions?: NotificationAction[];
  metadata?: NotificationMetadata;

  scheduledAt?: Date;
  expiresAt?: Date;
}

export interface UpdateNotificationStatusInput {
  status: NotificationStatus;
  lastError?: string;
}

export interface MarkNotificationReadInput {
  tenantId: Types.ObjectId;
  deliveryId: Types.ObjectId;
  recipientId: Types.ObjectId;
}

export interface NotificationQuery {
  tenantId: Types.ObjectId;

  recipientId?: Types.ObjectId;

  type?: NotificationType;
  status?: NotificationStatus;
  channel?: NotificationChannel;

  isRead?: boolean;
  entityType?: NotificationEntityType;
  entityId?: Types.ObjectId;

  sourceModule?: string;
  sourceEvent?: string;

  startDate?: Date;
  endDate?: Date;

  page?: number;
  limit?: number;
}

export interface NotificationDocumentView {
  notificationId: Types.ObjectId;
  deliveryId: Types.ObjectId;

  tenantId: Types.ObjectId;

  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;

  title: string;
  message: string;
  body?: string;

  channel: NotificationChannel;
  isRead: boolean;
  readAt?: Date;

  entityType?: NotificationEntityType;
  entityId?: Types.ObjectId;

  scheduledAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
}
