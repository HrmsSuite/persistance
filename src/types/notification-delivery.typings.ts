import { Types } from "mongoose";
import { NotificationChannel, NotificationDeliveryStatus, NotificationRecipientType } from "../constants";
import { NotificationMetadata } from "./notification-shared.typings";
 

export type NotificationDeliveryId = Types.ObjectId;

export interface NotificationDelivery {
  _id: NotificationDeliveryId;

  notificationId: Types.ObjectId;
  tenantId: Types.ObjectId;

  deliveryKey: string;

  channel: NotificationChannel;

  recipientType: NotificationRecipientType;

  recipientId?: Types.ObjectId;
  externalRecipientId?: string;

  email?: string;
  phone?: string;
  pushToken?: string;
  whatsapp?: string;
  recipientName?: string;

  status: NotificationDeliveryStatus;

  isRead: boolean;
  readAt?: Date;

  attemptCount: number;
  maxAttempts: number;

  scheduledAt?: Date;
  lastAttemptAt?: Date;
  sentAt?: Date;
  deliveredAt?: Date;

  provider?: string;
  providerMessageId?: string;

  errorMessage?: string;
  metadata?: NotificationMetadata;

  createdAt: Date;
  updatedAt: Date;
}
