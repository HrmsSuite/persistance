// notification-shared.typings.ts
import { Types } from "mongoose";
import { NotificationRecipientType } from "../constants";

export type NotificationMetadata = Record<string, unknown>;

export interface NotificationAction {
  label: string;
  url?: string;
  actionId?: string;
  metadata?: NotificationMetadata;
}

export interface NotificationTemplateReference {
  templateId: string;
  templateVersion: number;
  variables?: NotificationMetadata;
}

export interface NotificationRecipientEventPayload {
  type: NotificationRecipientType;

  recipientId?: string;
  externalRecipientId?: string;

  email?: string;
  phone?: string;
  pushToken?: string;
  whatsapp?: string;

  name?: string;
  metadata?: NotificationMetadata;
}
