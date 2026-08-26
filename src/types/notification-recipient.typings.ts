import { Types } from "mongoose";
import { NotificationRecipientType } from "../constants";
import { NotificationMetadata } from "./notification-shared.typings";

export interface NotificationRecipientInput {
  type: NotificationRecipientType;

  recipientId?: Types.ObjectId;
  externalRecipientId?: string;

  email?: string;
  phone?: string;
  pushToken?: string;
  whatsapp?: string;

  name?: string;
  metadata?: NotificationMetadata;
}
