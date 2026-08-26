import { HydratedDocument, model, type Model } from "mongoose";
import type { Notification } from "../types/notification.typings.js";
import { NotificationSchema } from "../schema/notification.schema.js";

export type NotificationDocument = HydratedDocument<Notification>;

export type NotificationModelType = Model<Notification>;

export const NotificationModel = model<Notification>(
  "Notification",
  NotificationSchema,
  "notifications",
);
